export default class GetBikes {  
  static bikes(zip, distance) {
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${zip}&distance=${distance}&stolenness=stolen`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })      
      .catch(function(error) {
        return error;
      });
  }
}
