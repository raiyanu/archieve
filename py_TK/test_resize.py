#Import the required Libraries
from tkinter import *
from PIL import Image,ImageTk

#Create an instance of tkinter frame
win = Tk()

#Set the geometry of tkinter frame
win.geometry("750x400")

#Create a canvas
canvas= Canvas(win, width= 740, height= 390)
canvas.pack()

#Load an image in the script
a = "alice"
fun= (Image.open("pics/"+a+".jpg"))


pic = ImageTk.PhotoImage(Image.open("pics/img("+str(picnum)+").jpg"))




#pic = ImageTk.PhotoImage(Image.open("pics/img("+str(picnum)+").jpg"))
#Resize the Image using resize method
resized_image= fun.resize((700,380), Image.ANTIALIAS)
new_image= ImageTk.PhotoImage(resized_image)

#Add image to the Canvas Items
canvas.create_image(10,10, anchor=NW, image=new_image)

win.mainloop()