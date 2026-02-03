import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../bloc/home_bloc.dart';
import '../bloc/home_event.dart';
import '../bloc/home_state.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => HomeBloc()..add(const HomeStarted()),
      child: Scaffold(
        appBar: AppBar(title: const Text('La Constitution')),
        body: Center(
          child: BlocBuilder<HomeBloc, HomeState>(
            builder: (context, state) {
              if (!state.isReady) {
                return const CircularProgressIndicator();
              }
              return const Text('Mobile prêt (Phase 1)');
            },
          ),
        ),
      ),
    );
  }
}
