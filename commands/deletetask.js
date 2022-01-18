const fetch = require("node-fetch");
const ClickUpAPIUtils = require("../ClickUpAPIUtils");
const config = require("../config");

exports.run = async (client, message, args) => {
  if (args.length !== 2)
    return message.channel.send(
      "Please add 2 arguments with a \`\`|\`\` delimiter."
    );

  const task = await ClickUpAPIUtils.getTask(args[0]);
  if (task.err) {
    return message.channel.send(`Error on getting tasks: ${task.err}`);
  }

  const lists = await ClickUpAPIUtils.getFLists();
  if (!lists) return message.channel.send("Folderless lists not found.");

  const list = lists.find((x) => x.name.toLowerCase() === args[1] || x.id === args[1]);
  const res = await ClickUpAPIUtils.deleteTask(list.getTask(args[0]));
  if (res.err) return message.channel.send(`Error on action! ${res.err}`);

  return message.channel.send(
    `Deleted task \`\`${task.name}\`\` from list \`\`${list.name}\`\`!`
  );
};

exports.help = {
  name: "deletetask",
};
