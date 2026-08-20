package nested_for_loop;
import java.util.Scanner;
public class hain {
	public static void main(String[] args){
		// TODO make a ultimate matrix
		Scanner scan = new Scanner(System.in);
		System.out.println("\t\t--= wellcum the projram =--");
		System.out.println("Enter the number of matrix Row :");
		int mRow = scan.nextInt();
		System.out.println("Enter the number of matrix Column:");
		int mCol = scan.nextInt();
		System.out.println("Enter the number of matrix of Row :");
		int Row = scan.nextInt();
		System.out.println("Enter the number of matrix of Column:");
		int Col = scan.nextInt();
		System.out.println("Enter the symbol you wanna print :");
		String symbol = scan.next();
		scan.close();
		for (int i = 0; i <= Col; i++) {
			for (int j = 0; j <= Row; j++) {
				for (int k = 0; k <= mRow; k++) {
					for (int k2 = 0; k2 <= mCol; k2++) {
						System.out.print(symbol);
					}
					System.out.print(" ");
				}
				System.out.println();
			}
		}
		System.out.println();
		System.out.println("--= END =--");
		
	}

}
