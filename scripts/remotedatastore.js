(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }


  // RemoteDataStore.prototype.add = function(key, val) {
  //   $.post(this.serverUrl, val, function (serverResponse){
  //     console.log(serverResponse);
  //   });
  // };

  //Retrieve data from serverUrl
  // RemoteDataStore.prototype.getAll = function(cb){
  //   $.get(this.serverUrl, function (serverResponse){
  //     console.log(serverResponse);
  //     cb(serverResponse);
  //   });
  // };

  //Call Back
  // RemoteDataStore.prototype.get = function(key, cb){
  //   $.get(this.serverUrl + '/' + key, function (serverResponse){
  //     console.log(serverResponse);
  //     cb(serverResponse);
  //   });
  // };

  //Remove Data
  // RemoteDataStore.prototype.remove = function(key){
  //   $.ajax(this.serverUrl + '/' + key,{
  //     type: 'DELETE'
  //   });
  // };
  // RemoteDataStore.prototype.get = function(key){
  //
  // };

  RemoteDataStore.prototype.getAll = function(key){
   $.ajax(this.serverUrl,{
     type:'GET',
     success: function(serverResponse){
       console.log(serverResponse);
     },
     error: function(xhr){
       console.log(xhr.responseText);
     }
   });
  };

  RemoteDataStore.prototype.getId = function(key){
    $.ajax(this.serverUrl,{
      type:'GET',
      contentType: 'application/json';
      data: JSON.stringify({id : key}),
      success: function(){

      },
      error: function(xhr){
        console.log(xhr.responseText);
      }
    });
  };

  RemoteDataStore.prototype.add = function(key,val){
   $.ajax(this.serverUrl,{
     type:'POST',
     contentType: 'application/json',
     data: JSON.stringify({emailCustomer : key, coffeeOrder : val.coffee}),
     success: function(){

     },
     error: function(xhr){
       console.log(xhr.responseText);
     }
   });
 };

 RemoteDataStore.prototype.remove = function(key){
   var homeurl = this.serverUrl;
   $.ajax({
     type:'POST',
     url: homeurl,
     data: {_method:"DELETE"},
     success: function(serverResponse){
       console.log(serverResponse);
     },
     error: function(xhr){}
   });
 };



  App.RemoteDataStore = RemoteDataStore;
  window.App = App;


})(window);
