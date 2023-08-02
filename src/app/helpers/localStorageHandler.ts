export class LocalStorageHandler {
  static getLoginUserId(): string {
    return localStorage.getItem('Id') || '';
  }

  static DeleteAllFromLocalStorage() {
    localStorage.clear();
  }
}
