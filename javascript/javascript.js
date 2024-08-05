function Sudoku(){
	var board = createJSBoard();

	var checkBoard = checkValidSudoku(board);
	while(checkBoard.isValid == false){
		board = shuffleBoard(board, checkBoard.row, checkBoard.col);
		checkBoard = checkValidSudoku(board);
	}
	
	createHTMLBoard(board);
}

// Créé un tableau JS 9*9 avec des lignes valides
function createJSBoard(){
	var board = Array();
	
	// Remplissage des colonnes
	for(let i = 0;i < 9;i++){
		var row = Array();
		
		// Remplissage des lignes
		for(let j = 0;j < 9;j++){
			let bool = false;
			while(bool == false){
				var randomInt = Math.ceil(Math.random()*9);
				bool = row.includes(randomInt) ? false : true;
			}
			row.push(randomInt);
		}
		board.push(row);
	}
	
	return board;
}

// Vérifie que les colonnes et que les carrés sont bons
function checkValidSudoku(board){

	// Vérification des colonnes
	var columnBoard = Array();
	
	// On isole les colonnes en tableaux
	for(let i = 0;i < board.length;i++){
		var column = Array();
		
		for(let j = 0;j < board[i].length;j++){
			column.push(board[j][i]);
		}
		columnBoard.push(column);
	}
	
	for(let i = 0;i < columnBoard.length;i++){
		for(let j = 0;j < columnBoard[i].length;j++){
			var indexOf = columnBoard[i].indexOf(columnBoard[i][j], j+1);
			if(indexOf != -1){
				return{
					isValid : false,
					row : indexOf,
					col : i
				}
			}
		}
	}
	
	// Vérification des carrés
	var squareBoard = Array();
	
	// On isole les carrés 3*3 en tableaux
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            let subBoard = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    subBoard.push(board[row + i][col + j]);
                }
            }
            squareBoard.push(subBoard);
        }
    }
	
	for(let i=0;i < squareBoard.length;i++){
		for(let j = 0;j < squareBoard[i].length;j++){
			var indexOf = squareBoard[i].indexOf(squareBoard[i][j], j+1);
			if(indexOf != -1){
				return{
					isValid : false,
					line : i
				}
			}
		}
	}
	
	return{
		isValid : true,
		line : -1,
		col : -1
	}
}

// Mélange la ligne d'une matrice
function shuffleBoard(matrix, row, col = 0){
	var board = matrix[row];
    for (let i = board.length - 1; i > col; i--) {
        let j = Math.floor(Math.random() * (i + 1 - col) + col);
        [board[i], board[j]] = [board[j], board[i]];
    }
	matrix[row] = board;
	return matrix;
}

// Vérifie qu'une grille peut être valide
function isValidSudoku(matrix){
	
}

// Créé un tableau HTML avec les valeurs d'un Sudoku
function createHTMLBoard(board){
	var body = document.getElementById('placeSudoku');
	
	// Vérifie si un tableau est déjà existant
	var tableau = document.getElementById('sudoku');
	if(tableau) tableau.remove();

	var table = document.createElement('table');
	table.id = "sudoku";
	body.appendChild(table);
	
	for(let i = 0;i < board.length;i++){
		var tr = document.createElement('tr');
		tr.id = "row" + (i + 1);
		tr.className = "row";
		table.appendChild(tr);
		for(let j = 0;j < board[i].length;j++){
			var td = document.createElement('td');
			td.id = "row" + (i + 1) + "-cell" + (j + 1);
			td.className = "cell";
			tr.appendChild(td);
			
			var input = document.createElement('input');
			input.id = i + "." + j;
			input.value = board[i][j];
			td.appendChild(input);
		}
	}
}