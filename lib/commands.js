class Commands {
  constructor(commandsList) {
    this.setCommands(commandsList);
  }

  getCommands() {
    return this.commandsList;
  }

  setCommands(newCommandsList) {
    this.commandsList = newCommandsList;
  }
}

module.exports = Commands;
