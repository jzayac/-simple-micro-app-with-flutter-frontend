class Base {
  DateTime createdAt;
  DateTime updatedAt;

  Base({DateTime? createdAt, DateTime? updatedAt})
      : createdAt = createdAt ?? DateTime.now(),
        updatedAt = updatedAt ?? DateTime.now();
}
