package hypotenus;

import javax.swing.JOptionPane;

public class gain {

	public static void main(String[] args) {
		int x=Integer.parseInt(JOptionPane.showInputDialog(null, "welcome\nplease enter value for X:"));
		int y=Integer.parseInt(JOptionPane.showInputDialog(null, "please enter value for Y:"));
		JOptionPane.showMessageDialog(null, "The hypotenus is :"+(Math.sqrt((x*x)+(y*y))));
	}

}
