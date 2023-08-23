import 'package:frontend/model/State.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; 

class Api {

  static Future<StateTree> getStateTreeBySateName(String stateName) async {
     final response = await http.get(Uri.parse('http://localhost:3000/state/$stateName'));

     if (response.statusCode == 200) {
       final jsonDecode = json.decode(response.body);
       final stateTree =  StateTree.fromMap(jsonDecode);
       return stateTree;
     } else {
       return StateTree(stateName: '', counties: []);
     }
   }

}
