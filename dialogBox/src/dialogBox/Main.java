package dialogBox;

import javax.swing.JOptionPane;

public class Main {

	public static void main(String[] args) {
		//String f_name = JOptionPane.showInputDialog("Enter your first name : ");
		//String l_name = JOptionPane.showInputDialog("Enter your last name : ");
		//JOptionPane.showInternalMessageDialog(null, "hi mr " + f_name+" "+ l_name);
		
		int first = Integer.parseInt(JOptionPane.showInputDialog("Enter your frist number: "));
		int second = Integer.parseInt(JOptionPane.showInputDialog("Enter your second number: "));
		
		JOptionPane.showMessageDialog(null, "additon :" + (first+second));
		
		
		

	}

}
