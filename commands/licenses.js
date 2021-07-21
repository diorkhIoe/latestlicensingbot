// init require
const Discord = require('discord.js');
const fs = require("fs");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const owner = process.env.Owner;
const prefix = process.env.Prefix;

// export module
module.exports = {
	name : "licenses",
	description : "BOT help commands",
	aliases : ["This Prompt."],
	ussage : "[command]",
	hidden : false,
	admin : false,
	nsfw : false,



    async execute(client,message,args){
		const targetUser = message.mentions.users.first()
		var guild = message.guild
        const {description, color} = client.setting;
		const own = client.users.resolve(owner);
		var desc = description.replace(/{{owner}}/g,`\`\`${own.tag}\`\``);


		var util = client.util;
		const embed = new Discord.MessageEmbed();
		if(message.member.roles.cache.some(role => (role.name === 'seller' || role.name === 'nick'))) {
			if (!targetUser) {
				embed
	    		.setColor(color.danger)
		    	.setTitle('Error')
                .setTimestamp()
			    .setDescription(
    				`Couldn't find user. Make sure you're pinging the individual.`
	    		)

		    	return message.channel.send(embed);
			}
			message.channel.send(`Getting licenses. If I don't respond, I couldn't find any licenses under the user you mentioned.`)
			args.shift()
            let member = message.mentions.members.first() || message.member,
            user = member.user
            const allowedIDs = [`865690394352156694`, `865690394174816276`, `865690393285754910`, `865690392393285722`, `865690391424401449`, `865690390383296532`, `865690389134835722`];
            const roles = member.roles
            const newRoles = roles.cache.filter(role => allowedIDs.includes(role.id))
			embed
			.setColor(color.hack)
            .setTimestamp()
            .setFooter(`${targetUser}'s Licenses`)
			.addField(`Found:`, newRoles.map(role => role.name), false)
			return message.channel.send(embed);
		}else{
			message.reply(`You're lacking the needed permissions.`)
		}
	}
}