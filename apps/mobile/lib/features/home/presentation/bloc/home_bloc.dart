import 'package:flutter_bloc/flutter_bloc.dart';
import 'home_event.dart';
import 'home_state.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  HomeBloc() : super(HomeState.initial()) {
    on<HomeStarted>((event, emit) async {
      // Phase 1: aucune logique métier, juste "ready"
      emit(state.copyWith(isReady: true));
    });
  }
}
