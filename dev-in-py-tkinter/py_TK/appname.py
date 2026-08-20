from tkinter import *

root = Tk()
root.title("ray's app") 
#making widgets (generation)
mynum1 = Button(root, text="hello1").grid(row=0,column=0).grid()
mynum2 = Button(root, text="hello2").grid(row=0,column=0).grid()
mynum3 = Button(root, text="hello3").grid(row=1,column=0).grid()
mynum4 = Button(root, text="hello4").grid(row=1,column=0).grid()
mynum5 = Button(root, text="hello1").grid(row=0,column=0).grid()
mynum6 = Button(root, text="hello2").grid(row=0,column=0).grid()
mynum7 = Button(root, text="hello3").grid(row=1,column=0).grid()
mynum8 = Button(root, text="hello4").grid(row=1,column=0).grid()
mynum9 = Button(root, text="hello1").grid(row=0,column=0).grid()

mynum0 = Button(root, text="hello1").grid(row=0,column=0).grid()
#showing widgets to display out (output)

#myLabel1.
#myLabel2.grid
#myLabel3.grid(row=1, column=0)
#myLabel4.grid(row=1, column=1)
root.mainloop()