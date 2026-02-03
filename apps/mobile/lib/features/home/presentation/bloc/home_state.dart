import 'package:equatable/equatable.dart';

class HomeState extends Equatable {
  final bool isReady;

  const HomeState({required this.isReady});

  factory HomeState.initial() => const HomeState(isReady: false);

  HomeState copyWith({bool? isReady}) {
    return HomeState(isReady: isReady ?? this.isReady);
  }

  @override
  List<Object?> get props => [isReady];
}
