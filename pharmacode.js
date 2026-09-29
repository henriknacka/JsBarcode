function pharmacode(number){
    //Ensure that the input is inturpreted as a number
    this.number = parseInt(number);

    this.getText = function(){
      return this.number + "";
    };

    function recursiveEncoding(code,state){
        //End condition
        if(code.length == 0) return "";

        var generated;
        var nextState = false;
        var nZeros = zeros(code);
        if(nZeros == 0){
            generated = state ? "001" : "00111";
            nextState = state;
        }
        else{
            generated = repeat("001", nZeros - (state ? 1 : 0));
            generated += "00111";
        }
        return recursiveEncoding(code.substr(0,code.length - nZeros - 1),nextState) + generated;
    };

    this.encoded = function(){
        if(this.valid(this.number)){
            return recursiveEncoding(this.number.toString(2),true).substr(2);
        }
        return "";
    };

    this.valid = function(){
        return this.number >= 3 && this.number <= 131070;
    };

    //A help function to calculate the zeros at the end of a string (the code)
    var zeros = function(code){
        var i = code.length - 1;
        var zeros = 0;
        while(i>=0 && code[i]=="0"){
            zeros++;
            i--;
        }
        return zeros;
    };

    //Use a repeat helper instead of modifying String.prototype
    function repeat(str, num){
        return new Array( num + 1 ).join( str );
    }
};
