// init require
const Discord = require('discord.js');
const fs = require("fs");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const owner = process.env.Owner;
const prefix = process.env.Prefix;

// export module
module.exports = {
	name : "list",
	description : "List of Licenses",
	aliases : ["listlicenses"],
	ussage : "[command]",
	hidden : false,
	admin : false,
	nsfw : false,
	async execute(client,message,args){
		const {description, color} = client.setting;
		const own = client.users.resolve(owner);
		var desc = description.replace(/{{owner}}/g,`\`\`${own.tag}\`\``);
        if(message.member.roles.cache.some(role => (role.name === 'seller' || role.name === 'nick'))) {
            const embed = new Discord.MessageEmbed();
            embed
           .setColor(color.hack)
           .setTitle('List of Licenses')
           .addFields(
            { name: 'Eden Orphan Home', value: 'OLD Version of Eden Orphan Home (Before milk closet)' },
            { name: 'Red Foxes Grammar', value: 'Bug-Fixed version of Red Foxes.' },
            { name: 'Les Beyond East', value: 'PRIDE Month Version of Les Beyond East.' },
            { name: 'De Pride Drowned', value: 'Latest De Pride Isle with Drowned Creatures.' },
            { name: 'De Pride 3Floors', value: 'De Pride Isle with 3 floors update.' },
            { name: 'De Pride 2Floors', value: 'De Pride Isle with 2 floors.' },
            { name: 'Kaliya Island', value: 'NFS - Not scripted yet.' },
        );

        return message.channel.send(embed);
        }else{
            message.channel.send(`You don't have permissions to use this command. (Seller+)`)
        }
		
	}
}