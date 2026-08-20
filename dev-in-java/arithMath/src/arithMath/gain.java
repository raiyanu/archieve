package arithMath;

import javax.swing.JOptionPane;

public class gain {
	public static void main(String[] args) {
		
		Double love = Double.parseDouble(JOptionPane.showInputDialog("Enter your age :"));
		Double hate = Double.parseDouble(JOptionPane.showInputDialog("Enter your her :"));
		Double maxi =Math.max(love, hate);
		JOptionPane.showMessageDialog(null, "well old is who is "+maxi+" years old");

	}

}
