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

  //get all information in server
  RemoteDataStore.prototype.getAll = function(key) {
    $.ajax(this.serverUrl, {
      type: 'GET',
      success: function(serverResponse) {
        console.log(serverResponse);
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  //Get coffee Order by email
  RemoteDataStore.prototype.get = function(key) {
    $.ajax(this.serverUrl, {
      type: 'GET',
      contentType: 'application/json',
      data: JSON.stringify({
        emailCustomer: key
      }),
      success: function(serverResponse) {
        console.log(serverResponse);
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  //Add coffee order including email, name, size, flavor, strength to server
  RemoteDataStore.prototype.add = function(key, val) {
    $.ajax(this.serverUrl, {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        emailCustomer: key,
        coffeeOrder: val.coffee,
        size: val.size,
        flavor: val.flavor,
        strength: val.strength
      }),
      success: function() {},
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  //Remove coffeeOrder from server
  RemoteDataStore.prototype.remove = function(key) {
    var collectionUrl = this.serverUrl;
    var response = $.ajax(this.serverUrl, {
      type: 'GET',
      contentType: 'application/json',
      data: JSON.stringify({
        emailCustomer: key
      }),
      success: function() {
        var getid = response.responseJSON[0].id;
        $.ajax({
          type: 'POST',
          url: collectionUrl + '/' + getid,
          data: {
            _method: "DELETE"
          }
        });
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });

  };

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

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;


})(window);
