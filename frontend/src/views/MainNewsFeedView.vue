<template>
    <div>
        <img alt="Logo Groupomania Rouge" src="../../../Icones/icon-left-font.webp">
        <div>
            <h3>Quelque chose à partager</h3>
            <form>
                <textarea id="newPostFromUser" name="newPostFromUser" rows="7" cols="50"></textarea>
                <br>
                <input type="submit" value="Valider"><br>
                <input type="submit" value="Modifer"><br>
                <input type="submit" value="Supprimer"><br>
            </form>
            <button type="button">Ajouter une image (.jpg ou .png)</button>
        </div>
        <div>
            <div class="previousPost"></div><br>
            <input type="text" id="comment" name="comment" placeholder="Mon commentaire">
            <input type="submit" value="J'aime"><br>
            <input type="submit" value="Je n'aime pas"><br>
            <input type="submit" value="Valider"><br>
            <input type="submit" value="Modifer"><br>
            <input type="submit" value="Supprimer"><br>
        </div>
        <!--
            logo
            Menu avec Profil et deconnexion
            1ère div = "Quelque chose à partager ?" + Button pour ajouter une image + Button valider
            Divs suivantes = Précédents posts en ordre antéchronologique
        -->
    </div>
</template>