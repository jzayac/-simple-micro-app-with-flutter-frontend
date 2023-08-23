import './abstract/Base.dart';
import './County.dart';

class StateModel extends Base {
  int id;
  String stateName;

  StateModel({
    required this.id,
    required this.stateName,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super(createdAt: createdAt, updatedAt: updatedAt);

  factory StateModel.fromMap(Map<String, dynamic> data) {
    return StateModel(
      id: data['id'] as int,
      stateName: data['stateName'] as String,
      createdAt: data['createdAt'] as DateTime,
      updatedAt: data['updatedAt'] as DateTime,
    );
  }
}


class StateTree {
  String stateName;
  List<CountyTree> counties;

  StateTree({
    required this.stateName,
    required this.counties,
  });

  factory StateTree.fromMap(Map<String, dynamic> data) {
    late String stateName;
    data.forEach((key, value) {
      stateName = key;
    });

    return StateTree(
      stateName: stateName,
      counties: List<CountyTree>.from(data[stateName].map((x) => CountyTree.fromMap(x))),
    );
  }
}
