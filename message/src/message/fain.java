package message;

import javax.swing.JOptionPane;

public class fain {



	public static void main(String[] args) {
		System.out.println("heloo");
		String name=JOptionPane.showInputDialog(null,"Enter your name please:");
		JOptionPane.showMessageDialog(null, "your name is "+name);
		int age = Integer.parseInt(JOptionPane.showInputDialog("enter your age:"));
		JOptionPane.showMessageDialog(null, "you are "+age+" years old");
	}

}
