from tkinter import*
from tkinter import messagebox
roy = Tk()
roy.title("ray")
ray =Frame(roy,"400x200")
#================================================================================error popup===============
label = Label(ray,text="please enter here how many times you want to get pop \n <|must be below 12 pop for you to not get lag :) |>")
entry = Entry(ray,width = 30)
entry.pack(side=LEFT)
def a():
	z = (1+int(entry.get()))
	z = int(z)
	if z<=10:
		for x in range(1,z):
			messagebox.showerror("error","this is a "+str(x)+"th window")
button = Button(ray,text="click",font=20,command=a).pack()
#================================================================================error popup===============
#================================================================================error popup===============
#================================================================================error popup===============
#================================================================================error popup===============
mainloop()