from tkinter import *

root = Tk()
def mybuttowk():
	butts = Label(root,text="so! you did click my butt",fg="blue",bg="violet",boarderwidth=5)
	mybutt = Button(root,text="click my butt",padx=50,pady=40,command=mybuttowk,fg="green",bg="black",)
	mybutt.pack()
	gentries =Entry(root,fg="green",bg="yellow",boarderwidth=70).pack()
	butts.pack()
#making widgets (generation)
mybutt = Button(root,text="click my butt",padx=50,pady=40,command=mybuttowk,fg="green",bg="black")
mybutt.pack()
#showing widgets to display out (output)

gentries =Entry(root,fg="green",bg="yellow").pack()
root.mainloop()