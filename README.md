This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Lancer le projet avec WAMP

Dans package.json, ajouter la ligne : "homepage":"http://localhost/"+sous dossiers de www <br />
Exemple : "homepage":"http://localhost/ProjetInfo" <br />
Executer 'npm run build' <br />
Déplacer le contenu du dossier 'build' créé dans wamp64/www/ProjetInfo <br />
Lancer WAMP <br />
Dans le navigateur, aller à l'URL : http://localhost/ProjetInfo/

## Utilisation de la base de donnée

Se munir des fichiers <strong>api.php</strong> et <strong>connexion.php</strong> dans le dossier <em>projet-web/projet-web_bdd</em>.<br/>
Bien les placer dans un sous-dossier de <em>www</em> de wamp<br/>
Changer la base de l'url des requêtes dans les fichiers par `http://localhost/"votre chemin à partir de www"/api.php`<br/>
Vérifier que l'on a bien:<br/>
- Une base de donnée : projetsiterencontre.
- Une table : user.
- Les bons identifiants de la BDD dans connexion.php <br/>
Lancer wamp et tout devrait fonctionner sinon -> Théo

## npm install

Paquets installés (j'en ai peut-être oublié):
- npm install --save react-router-dom
- npm install react-bootstrap bootstrap
- npm install hash-anything
- npm install bootstrap

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
