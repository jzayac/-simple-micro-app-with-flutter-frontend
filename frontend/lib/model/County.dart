import './abstract/Base.dart';
import './City.dart';

class County extends Base {
  int id;
  String countyName;
  String countyFips;
  int stateId;

  County({
    required this.id,
    required this.countyName,
    required this.countyFips,
    required this.stateId,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super(createdAt: createdAt, updatedAt: updatedAt);

  factory County.fromMap(Map<String, dynamic> data) {
    return County(
      id: data['id'] as int,
      countyName: data['countyName'] as String,
      countyFips: data['countyFips'] as String,
      stateId: data['stateId'] as int,
      createdAt: data['createdAt'] as DateTime,
      updatedAt: data['updatedAt'] as DateTime,
    );
  }
}

class CountyTree {
  String countyName;
  List<CityTree> cities;

  CountyTree({
    required this.countyName,
    required this.cities,
  });

  factory CountyTree.fromMap(Map<String, dynamic> data) {
    late String countyName;
    data.forEach((key, value) {
      countyName = key;
    });

    return CountyTree(
      countyName: countyName,
      cities: List<CityTree>.from(
          data[countyName].map((x) => CityTree.fromString(x))),
    );
  }
}
