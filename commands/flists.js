const fetch = require("node-fetch");
const ClickUpAPIUtils = require("../ClickUpAPIUtils");
const config = require("../config");

exports.run = async (client, message, args) => {

    const lists = await ClickUpAPIUtils.getFLists();
    if (lists.err) return message.channel.send(`Error fetching folders: ${lists.err}`);

    let msg = "";
    for (const list of lists) {
      const lists = await ClickUpAPIUtils.getFLists();
      msg += `\n--------\n${lists
        .map((l) => `  • ${l.name}`)
        .join("\n")}`;
    }

    return message.channel.send(`All lists:\n\`\`\`\n${msg}\n\`\`\``);

};

exports.help = {
  name: "lists",
};

