const fetch = require("node-fetch");
const ClickUpAPIUtils = require("../ClickUpAPIUtils");
const config = require("../config");

exports.run = async (client, message, args) => {

    const newArgs = message.content
        .slice(config.PREFIX.length + this.help.name.length)
        .trim()
        .split("|")
        .map((x) => x.trim());

    const status = await ClickUpAPIUtils.getStatus(newArgs[0]);
    if (status.err) return message.channel.send(`Error fetching task status: ${status.err}`);

    return message.channel.send(`The status of this task is :\`\`${status}\`\`\``);

};

exports.help = {
    name: "status",
};

