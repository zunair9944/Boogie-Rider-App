interface Location {
    lat: number
    lng: number
}
const driverIcon =
{
//   url: "https://icons.iconarchive.com/icons/iconsmind/outline/48/Car-2-icon.png",
url: "https://developers.google.com/static/maps/documentation/javascript/images/default-marker.png",
//   size: new google.maps.Size(48, 48),
//   origin: new google.maps.Point(0, 0),
//   anchor: new google.maps.Point(0, 48),
};
const riderIcon =
{
  url: "https://developers.google.com/static/maps/documentation/javascript/images/default-marker.png",
//   size: new google.maps.Size(48, 48),
//   origin: new google.maps.Point(0, 0),
//   anchor: new google.maps.Point(0, 48),
};
export function drawMarker(location:Location, gmap:any, type:string) {
    return new google.maps.Marker({
        position: location,
        map: gmap,
        icon: type == 'driver' ? driverIcon : riderIcon
      });
}