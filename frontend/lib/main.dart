import 'package:flutter/material.dart';
import 'package:frontend/model/State.dart';
import 'package:frontend/service/Api.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a blue toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'assetario backoffice demo'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  StateTree? _stateTree;
  // String searchText = 'California';
  // create controller for TextField 
  final TextEditingController _controller = TextEditingController(text: 'California');

  @override
  initState() {
    super.initState();

    Future.microtask(() {
      () async {
        final state = await Api.getStateTreeBySateName(_controller.text);
        setState(() {
          _stateTree = state;
        });
      }();
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // TRY THIS: Try changing the color here to a specific color (to
        // Colors.amber, perhaps?) and trigger a hot reload to see the AppBar
        // change color while the other colors stay the same.
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          //
          // TRY THIS: Invoke "debug painting" (choose the "Toggle Debug Paint"
          // action in the IDE, or press "p" in the console), to see the
          // wireframe for each widget.
          children: <Widget>[

            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    // put default searchText value
                    controller: _controller,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Search',
                      hintText: 'Enter a state name',
                    ),
                  ),
                ),
                IconButton(
                    icon: const Icon(Icons.search),
                    tooltip: 'Search',
                    onPressed: () {

                      // print(searchText);
                      print(_controller.text);
                      Api.getStateTreeBySateName(_controller.text).then((state) {
                        setState(() {
                          _stateTree = state;
                        });
                      });
                      // setState(() {
                      //   _stateTree = state;
                      // });
                    }),
              ],
            ),
            _stateTree == null
                ? const Text('Loading...')
                : CityList(stateTree: _stateTree!),
          ],
        ),
      ),
    );
  }
}

class CityList extends StatelessWidget {
  final StateTree stateTree;

  const CityList({super.key, required this.stateTree});

  @override
  Widget build(BuildContext context) {
    if (stateTree.counties.isEmpty) {
      return const Text('No counties found');
    }
    return Expanded(
        child: ListView.builder(
            scrollDirection: Axis.vertical,
            itemCount: stateTree.counties.length,
            itemBuilder: (context, index) {
              final county = stateTree.counties[index];
              return Container(
                  margin: const EdgeInsets.symmetric(vertical: 10),
                  child: Row(children: [
                    const SizedBox(
                      width: 10,
                    ),
                    Text(county.countyName),
                    const Spacer(),
                    Text(county.cities.length.toString()),
                    const SizedBox(
                      width: 10,
                    ),
                  ]));
            }));
  }
}
