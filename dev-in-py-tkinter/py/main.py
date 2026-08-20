from tkinter import *
ray = Tk()
sbar = Scrollbar(ray)
sbar.pack( side = RIGHT, fill = Y )
label = Label(ray,text="hello world").pack()
i = 0
mylist = Listbox(ray, yscrollcommand = sbar.set )
while i<=100:
    i = i+1
    print("fuck you "+str(i))
    mylist.insert(END, "This is line number _  "+str( i))
mylist.pack( side = LEFT, fill = BOTH )
sbar.config( command = mylist.yview )

mainloop()