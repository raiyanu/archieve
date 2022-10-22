print(" RIYA is online now ne!")
from pyrogram import Client, filters

bot = Client(
    " RIYA ASSISTANT",
    api_id = 18582017,
    api_hash = "6905d45c201e62ebf84a47b4a8562834",
    bot_token= "5386140365:AAFA6xkps-POYfJIqJIjECCP_VBHkr9lJsA"
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
