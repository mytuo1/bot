const config = require("../config");
const {join} = require("path");

module.exports = async (client, message) => {
  if (message.channel.type !== "text") return;
  if (!message.content.toLowerCase().startsWith(config.PREFIX.toLowerCase())) return;
/*  if (!message.member.roles.cache.has(config.STAFF_ROLE))
    return message.channel.send("no permission"); */

  const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
  const cmdName = args.shift().toLowerCase();
  const props = require(join(__dirname, "../commands", cmdName));
  client.commands.set(cmdName, props);
  console.log(`[Command Initialization] Command123 Loaded: ${cmdName}`);

/*
  const cmd = client.commands.find(x => x.help.name === cmdName);
*/
  const cmd = client.commands.get(cmdName)

/*
  return message.channel.send(`command is ${cmdName}`)
*/
  if (!cmd) return;
  console.log(
      `[Comamnd Execution] ${message.author.username} (${message.author.id}) ran command ${
          cmd.help.name
      }: ${cmdName} ${args.join(" ")}`
  );
  return cmd.run(client, message, args);
};