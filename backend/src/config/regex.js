exports.valideEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$', "g"
);

exports.validSearch = new RegExp(
    '^[a-zA-Z0-9\_]+$'
);