// init require
const Discord = require('discord.js');



// export module
module.exports = {
	name : "license",
	description : "give somebody a license.",
	aliases : ["Distribute License"],
	ussage : "[command]",
	hidden : false,
	admin : false,
	nsfw : false,
	async execute(client,message,args){
		const targetUser = message.mentions.users.first()
		var guild = message.guild
		if(message.member.roles.cache.some(role => (role.name === 'seller' || role.name === 'nick'))) {
			if (!targetUser) {
				message.channel.send('Please specify someone to give the license to.') 
				return 
			}
			
			args.shift()
			const roleName = args.join(' ')
				
			const role = guild.roles.cache.find((role) => {
				return role.name === roleName
			})
	
			if (!role) {
				message.channel.send(`There is no product with the name ${roleName}.`) 
				return
			}
	
			const member = guild.members.cache.get(targetUser.id) 
			member.roles.add(role)
	
			message.channel.send(`You've given the "${roleName}" license to that user.`)
		}else{
			message.reply(`You're lacking the needed permissions.`)
		}
	}
}