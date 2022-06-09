package nestedLoop;

import java.util.Scanner;

public class Haain {

	public static void main(String[] args) {
		System.out.println("--- [ STARTS ] ---");
		Scanner scan = new Scanner(System.in);
		System.out.println("\t\t--= wellcum the projram =--");
		System.out.println("Enter the number of matrix Row :");
		int mRow = scan.nextInt();
		System.out.println("Enter the number of matrix Column:");
		int mCol = scan.nextInt();
		System.out.println("Enter the number of Row :");
		int Row = scan.nextInt();
		System.out.println("Enter the number of Column:");
		int Col = scan.nextInt();
		System.out.println("Enter the symbol you wanna print :");
		String symbol = scan.next();
		scan.close();

		// matrix 3, matrix col 2, row 5 col 6
		
		
			for (int k = 0; k < Row; k++) {
				// prints a line then makes number of row for matrix
				for (int i = 0; i < mRow; i++) {
					//gives a space number space makes column from matrix
					for (int z = 0; z < Col; z++) {
						//prints stars to make matrix row
						for (int j = 0; j < mCol; j++) {
							System.out.print(symbol);
						}
						System.out.print(" ");
					}
					System.out.println();
				}
				System.out.println();
			}
				
					
					
					
					
					
					
System.out.println("\n");
	System.out.println("--- [END] ---");}

}
