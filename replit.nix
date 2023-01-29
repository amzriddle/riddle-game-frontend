{ pkgs }: {
	deps = [
		pkgs.nodejs-14_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
	];
}