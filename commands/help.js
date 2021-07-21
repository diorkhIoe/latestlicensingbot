// init require
const Discord = require('discord.js');
const fs = require("fs");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const owner = process.env.Owner;
const prefix = process.env.Prefix;

// export module
module.exports = {
	name : "help",
	description : "BOT help commands",
	aliases : ["This Prompt."],
	ussage : "[command]",
	hidden : false,
	admin : false,
	nsfw : false,
	async execute(client,message,args){
		const {description, color} = client.setting;
		const own = client.users.resolve(owner);
		var desc = description.replace(/{{owner}}/g,`\`\`${own.tag}\`\``);


		var util = client.util;
		const embed = new Discord.MessageEmbed();

		if(!args[0]){
			var cm = commandFiles.map((e,i) => {
				const cmd = require(`../commands/${e}`)
				if(!cmd.hidden){
					return `| #${util.tn(util.addZero(i+1,2),1)} | ${util.tn(cmd.name,2)} | ${util.tn(cmd.aliases.join(", "),4)} |`
				}
				return null;
			});

			var batas = "+--------+------------+----------------------+",
			footer = `❗ If you spot any issues, open a ticket.`;
			
			embed
			.setColor(color.hack)
			.setTitle('Bot Commands')
			.setDescription(
				`These are commands available to either sellers, or the public.`
			)
			.addFields(
				{ name: 'help', value: 'Shows this prompt.' },
				{ name: 'list', value: 'Shows all of the available licenses.' },
				{ name: 'license', value: 'Gives the desired user a license. `license @user product`' },
				{ name: 'licenses', value: 'Lists a users licenses. `licenses @user`' },
				{ name: 'revoke', value: 'Removes a license from the specified individual. `revoke @user product`' },
				{ name: 'ping', value: 'Gets the bot rate ping, used for testing.' },
			);

			return message.channel.send(embed);

		}else{
			var comid = client.commands.get(args[0]);
			if(!comid)return message.channel.send(`That is not a command. Try saying !help for a list of commands.`)
			var ussage = comid.ussage == null ? "": `**🔸${util.tn("Ussage",3)} :**\n\`\`\` ${prefix+comid.name} ${comid.ussage}\`\`\``;
			embed
			.setColor(color.warning)
			.setTitle(`**${comid.name}**`)
			.setAuthor(`${client.user.username} | Help Command`)
			.setDescription(
				`**🔸${util.tn("Description",3)} :**\n\`\`\`${comid.description}\`\`\`\n`+
				`**🔸${util.tn("Aliase(s)",3)} :**\n\`\`\` ${comid.aliases.join(", ")}\`\`\`\n`+
				`${ussage}`
				)

			return message.channel.send(embed);
		}
		
	}
}