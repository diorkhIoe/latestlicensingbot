// init require
const Discord = require('discord.js');



// export module
module.exports = {
	name : "revoke",
	description : "give somebody a license.",
	aliases : ["Revoke License"],
	ussage : "[command]",
	hidden : false,
	admin : false,
	nsfw : false,
	async execute(client,message,args){
		const targetUser = message.mentions.users.first()
		var guild = message.guild
		if(message.member.roles.cache.some(role => (role.name === 'seller' || role.name === 'nick'))) {
			if (!targetUser) {
				message.channel.send('Specify the user of which you want revoke the license.') 
				return 
			}
			
			args.shift()
			const roleName = args.join(' ')
			var guild = message.guild
				
			const role = guild.roles.cache.find((role) => {
				return role.name === roleName
			})
	
			if (!role) {
				message.channel.send(`There is no product with the name ${roleName}.`) 
				return
			}
	
			const member = guild.members.cache.get(targetUser.id) 
			console.log(member)
	
			if (member.roles.cache.get(role.id)) {
				member.roles.remove(role)
				message.channel.send(`You've revoked ${targetUser}'s ${roleName} license.`)
			}else{
				message.channel.send(`${targetUser} doesn't have the ${roleName} license.`)
			}
		}else{
			message.reply(`You're lacking the needed permissions.`)
		}
	}
}