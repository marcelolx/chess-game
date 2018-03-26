var board,
    jogo = new Chess();

var minimaxRoot =function(profundidade, jogo, isMaximisingPlayer) {

    var movimentosNovoJogo = jogo.movimentos_perigosos();
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < movimentosNovoJogo.length; i++) {
        var newGameMove = movimentosNovoJogo[i]
        jogo.ugly_move(newGameMove);
        var value = minimax(profundidade - 1, jogo, -10000, 10000, !isMaximisingPlayer);
        jogo.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

var minimax = function (profundidade, jogo, alfa, beta, estaMaximizandoOJogador) {
    quantidadePosicoes++;
    if (profundidade === 0) {
        return -avaliarTabuleiro(jogo.board());
    }

    var novosMovimentosDeJogo = jogo.movimentos_perigosos();

    if (estaMaximizandoOJogador) {
        var melhorMovimento = -9999;
        for (var i = 0; i < novosMovimentosDeJogo.length; i++) {
            jogo.ugly_move(novosMovimentosDeJogo[i]);
            melhorMovimento = Math.max(melhorMovimento, minimax(profundidade - 1, jogo, alfa, beta, !estaMaximizandoOJogador));
            jogo.undo();
            alfa = Math.max(alfa, melhorMovimento);
            if (beta <= alfa) {
                return melhorMovimento;
            }
        }
        return melhorMovimento;
    } else {
        var melhorMovimento = 9999;
        for (var i = 0; i < novosMovimentosDeJogo.length; i++) {
            jogo.ugly_move(novosMovimentosDeJogo[i]);
            melhorMovimento = Math.min(melhorMovimento, minimax(profundidade - 1, jogo, alfa, beta, !estaMaximizandoOJogador));
            jogo.undo();
            beta = Math.min(beta, melhorMovimento);
            if (beta <= alfa) {
                return melhorMovimento;
            }
        }
        return melhorMovimento;
    }
};

var avaliarTabuleiro = function (tabuleiro) {
    var avaliacaoTotal = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            avaliacaoTotal = avaliacaoTotal + getValorPeca(tabuleiro[i][j], i ,j);
        }
    }
    return avaliacaoTotal;
};

var reverseArray = function(array) {
    return array.slice().reverse();
};

var avaliacaoPeaoBranco =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var avaliacaoPeaoPreto = reverseArray(avaliacaoPeaoBranco);

var avaliacaoCavalo =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var avaliacaoBispoBranco = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var avaliacaoBispoPreto = reverseArray(avaliacaoBispoBranco);

var avaliacaoTorreBranca = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var avaliacaoTorrePreta = reverseArray(avaliacaoTorreBranca);

var avaliacaoRainha = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var avaliacaoReiBranco = [
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var avaliacaoReiPreto = reverseArray(avaliacaoReiBranco);




var getValorPeca = function (peca, x, y) {
    if (peca === null) {
        return 0;
    }
    var getValorAbsoluto = function (peca, isWhite, x ,y) {
        if (peca.type === 'p') {
            return 10 + ( isWhite ? avaliacaoPeaoBranco[y][x] : avaliacaoPeaoPreto[y][x] );
        } else if (peca.type === 'r') {
            return 50 + ( isWhite ? avaliacaoTorreBranca[y][x] : avaliacaoTorrePreta[y][x] );
        } else if (peca.type === 'n') {
            return 30 + avaliacaoCavalo[y][x];
        } else if (peca.type === 'b') {
            return 30 + ( isWhite ? avaliacaoBispoBranco[y][x] : avaliacaoBispoPreto[y][x] );
        } else if (peca.type === 'q') {
            return 90 + avaliacaoRainha[y][x];
        } else if (peca.type === 'k') {
            return 900 + ( isWhite ? avaliacaoReiBranco[y][x] : avaliacaoReiPreto[y][x] );
        }
        throw "Unknown piece type: " + peca.type;
    };

    var valorAbsoluto = getValorAbsoluto(peca, peca.color === 'w', x ,y);
    return peca.color === 'w' ? valorAbsoluto : -valorAbsoluto;
};


/* board visualization and games state handling */

var onDragStart = function (origem, peca, posicao, orientacao) {
    if (jogo.in_checkmate() === true || jogo.in_draw() === true ||
        peca.search(/^b/) !== -1) {
        return false;
    }
};

var determinarMelhorMovimento = function () {
    var melhorMovimento = getMelhorMovimento(jogo);
    jogo.ugly_move(melhorMovimento);
    board.position(jogo.fen());
    renderizarHistoricoMovimentos(jogo.history());
    if (jogo.game_over()) {
        alert('Game over');
    }
};


var quantidadePosicoes;
var getMelhorMovimento = function (jogo) {
    if (jogo.game_over()) {
        alert('Game over');
    }

    quantidadePosicoes = 0;
    var profundidadePesquisa = parseInt($('#search-depth').find(':selected').text());

    var d = new Date().getTime();
    var melhorMovimento = minimaxRoot(profundidadePesquisa, jogo, true);
    var d2 = new Date().getTime();
    var tempoMovimento = (d2 - d);
    var posicoesPorSegundo = ( quantidadePosicoes * 1000 / tempoMovimento);

    $('#position-count').text(quantidadePosicoes);
    $('#time').text(tempoMovimento/1000 + 's');
    $('#positions-per-s').text(posicoesPorSegundo);
    return melhorMovimento;
};

var renderizarHistoricoMovimentos = function (movimentos) {
    var historyElement = $('#move-history').empty();
    historyElement.empty();
    for (var i = 0; i < movimentos.length; i = i + 2) {
        historyElement.append('<span>' + movimentos[i] + ' ' + ( movimentos[i + 1] ? movimentos[i + 1] : ' ') + '</span><br>')
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);

};

var onDrop = function (origem, alvo) {

    var movimento = jogo.move({
        from: origem,
        to: alvo,
        promotion: 'q'
    });

    removerQuadradosCinza();
    if (movimento === null) {
        return 'snapback';
    }

    renderizarHistoricoMovimentos(jogo.history());
    window.setTimeout(determinarMelhorMovimento, 250);
};

var onSnapEnd = function () {
    board.position(jogo.fen());
};

var onMouseSobreQuadrado = function(quadrado, peca) {
    var movimentos = jogo.moves({
        square: quadrado,
        verbose: true
    });

    if (movimentos.length === 0) return;

    quadradoCinza(quadrado);

    for (var i = 0; i < movimentos.length; i++) {
        quadradoCinza(movimentos[i].to);
    }
};

var onMouseForaQuadrado = function(quadrado, peca) {
    removerQuadradosCinza();
};

var removerQuadradosCinza = function() {
    const background = 'background';

    $('#board .square-55d63').css(background, '');
};

var quadradoCinza = function(quadrado) {
    var squareEl = $('#board .square-' + quadrado);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseForaQuadrado,
    onMouseoverSquare: onMouseSobreQuadrado,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);