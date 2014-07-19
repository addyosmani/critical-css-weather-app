[
  "New York, New York",
  "Los Angeles, California",
  "Chicago, Illinois",
  "Houston, Texas",
  "Philadelphia, Pennsylvania",
  "Phoenix, Arizona",
  "San Diego, California",
  "San Antonio, Texas",
  "Dallas, Texas",
  "Detroit, Michigan",
  "San Jose, California",
  "Indianapolis, Indiana",
  "Jacksonville, Florida",
  "San Francisco, California",
  "Columbus, Ohio",
  "Austin, Texas",
  "Memphis, Tennessee",
  "Baltimore, Maryland",
  "Charlotte, North Carolina",
  "Fort Worth, Texas",
  "Boston, Massachusetts",
  "Milwaukee, Wisconsin",
  "El Paso, Texas",
  "Washington, District of Columbia",
  "Nashville-Davidson, Tennessee",
  "Seattle, Washington",
  "Denver, Colorado",
  "Las Vegas, Nevada",
  "Portland, Oregon",
  "Oklahoma City, Oklahoma",
  "Tucson, Arizona",
  "Albuquerque, New Mexico",
  "Atlanta, Georgia",
  "Long Beach, California",
  "Kansas City, Missouri",
  "Fresno, California",
  "New Orleans, Louisiana",
  "Cleveland, Ohio",
  "Sacramento, California",
  "Mesa, Arizona",
  "Virginia Beach, Virginia",
  "Omaha, Nebraska",
  "Colorado Springs, Colorado",
  "Oakland, California",
  "Miami, Florida",
  "Tulsa, Oklahoma",
  "Minneapolis, Minnesota",
  "Honolulu, Hawaii",
  "Arlington, Texas",
  "Wichita, Kansas",
  "St. Louis, Missouri",
  "Raleigh, North Carolina",
  "Santa Ana, California",
  "Cincinnati, Ohio",
  "Anaheim, California",
  "Tampa, Florida",
  "Toledo, Ohio",
  "Pittsburgh, Pennsylvania",
  "Aurora, Colorado",
  "Bakersfield, California",
  "Riverside, California",
  "Stockton, California",
  "Corpus Christi, Texas",
  "Lexington-Fayette, Kentucky",
  "Buffalo, New York",
  "St. Paul, Minnesota",
  "Anchorage, Alaska",
  "Newark, New Jersey",
  "Plano, Texas",
  "Fort Wayne, Indiana",
  "St. Petersburg, Florida",
  "Glendale, Arizona",
  "Lincoln, Nebraska",
  "Norfolk, Virginia",
  "Jersey City, New Jersey",
  "Greensboro, North Carolina",
  "Chandler, Arizona",
  "Birmingham, Alabama",
  "Henderson, Nevada",
  "Scottsdale, Arizona",
  "North Hempstead, New York",
  "Madison, Wisconsin",
  "Hialeah, Florida",
  "Baton Rouge, Louisiana",
  "Chesapeake, Virginia",
  "Orlando, Florida",
  "Lubbock, Texas",
  "Garland, Texas",
  "Akron, Ohio",
  "Rochester, New York",
  "Chula Vista, California",
  "Reno, Nevada",
  "Laredo, Texas",
  "Durham, North Carolina",
  "Modesto, California",
  "Huntington, New York",
  "Montgomery, Alabama",
  "Boise, Idaho",
  "Arlington, Virginia",
  "San Bernardino, California"
]

var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'api.openweathermap.org',
  path: '/data/2.5/forecast?q={Q}'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
