const fetch = require("node-fetch");
const config = require("../config");
const ClickUpAPIUtils = require("../ClickUpAPIUtils");

exports.run = async (client, message, args) => {
  const newArgs = message.content
    .slice(config.PREFIX.length + this.help.name.length)
    .trim()
    .split("|")
    .map((x) => x.trim());

     if (newArgs.length !== 3)
    return message.channel.send(
      "Please add more arguments with a \`\`|\`\` delimiter."
    );
    const folders = await ClickUpAPIUtils.getFLists(); 
    const list = folders.find((x) => x.name.toLowerCase() === newArgs[2] || x.id === newArgs[2]);

  if (!list) return message.channel.send(`invalid list`);
  else if (list.err) return message.channel.send(`Error getting list: ${list.err}`);

  const res = await ClickUpAPIUtils.createTask(list.id, newArgs[0], newArgs[1]);
  if (res.err) return message.channel.send(`Error on task creation! ${res.err}`);

  return message.channel.send(
    `Created a new task under the list \`\`${list.name}\`\`; Task link: https://app.clickup.com/t/${res.id}`
  );
};

exports.help = {
  name: "newtask",
};
