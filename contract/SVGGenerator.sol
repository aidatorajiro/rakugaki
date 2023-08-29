import "defs.sol";

contract SVGGeneratorVer1 is ISVGGenerator {
    function generate(NFTMeta memory meta)
        public
        pure
        returns (string memory)
    {
        return string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">',
            '</svg>'
        );
    }
}