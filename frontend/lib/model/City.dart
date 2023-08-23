import './abstract/Base.dart';

class City extends Base {
  int id;
  String cityName;
  String cityAscii;
  double lat;
  double lng;
  double population;
  double density;
  String source;
  bool military;
  bool incorporated;
  String timezone;
  double ranking;
  String zips;
  int countyId;

  City(
      {
       required this.id,
      required this.cityName,
      required this.cityAscii,
      required this.lat,
      required this.lng,
      required this.population,
      required this.density,
      required this.source,
      required this.military,
      required this.incorporated,
      required this.timezone,
      required this.ranking,
      required this.zips,
      required this.countyId,
      DateTime? createdAt,
      DateTime? updatedAt,
      }): super(createdAt: createdAt, updatedAt: updatedAt);

  factory City.fromMap(Map<String, dynamic> data) {
    return City(
      id: data['id'] as int,
      cityName: data['cityName'] as String,
      cityAscii: data['cityAscii'] as String,
      lat: data['lat'] as double,
      lng: data['lng'] as double,
      population: data['population'] as double,
      density: data['density'] as double,
      source: data['source'] as String,
      military: data['military'] as bool,
      incorporated: data['incorporated'] as bool,
      timezone: data['timezone'] as String,
      ranking: data['ranking'] as double,
      zips: data['zips'] as String,
      countyId: data['countyId'] as int,
      createdAt: data['createdAt'] as DateTime,
      updatedAt: data['updatedAt'] as DateTime,
    );
  }
}


class CityTree {
  String cityName;

  CityTree({
    required this.cityName,
  });

  factory CityTree.fromString(String data) {
    return CityTree(
      cityName: data,
    );
  }
}
