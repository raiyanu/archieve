print(" RIYA is online now ne!")
from pyrogram import Client, filters

bot = Client(
    " RIYA ASSISTANT",
    * naaa token and id isnt here bruh*
)
@bot.on_message(filters.command('start') & filters.private)
def command1(bot , message):
    bot.send_message(message.chat.id  , "hi you see i am alive...")  
@bot.on_message(filters.command('work'))
def command2(bot , message):
    bot.send_message(message.chat.id,"its woking ok...")    
@bot.on_message(filters.command('works') & filters.private)
def command2(bot , message):
    bot.send_message(message.chat.id,"its woking ok...")    
bot.run()
