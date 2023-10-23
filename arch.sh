#!/bin/sh
branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}
branch_name=${branch_name:-HEAD}
git push origin $branch_name

if [ "$branch_name" = "desarrollo" ]; then
ssh itefs@181.143.139.108 '
echo "Conectando con servidor..."
cd Documentos/frontendfull/desarrollo;
git pull origin desarrollo
echo "CAMBIOS EFECTUADOS"
'
fi
if [ "$branch_name" = "master" ]; then
ssh itefs@181.143.139.108 '
echo "Conectando con servidor..."
cd Documentos/frontendfull/master;
git pull origin master
ng build --prod --base-href --output-path=dist/front
cd dist
cp -r front ~/Documentos/apache-tomcat-9.0.43/webapps/
echo "CAMBIOS EFECTUADOS"
'
fi
if [ "$branch_name" = "pruebas" ]; then
ssh itefs@181.143.139.108 '
echo "Conectando con servidor..."
cd Documentos/frontendfull/pruebas;
git pull origin pruebas
ng build --prod --base-href --output-path=dist/front-prb
cd dist
cp -r front-prb ~/Documentos/apache-tomcat-9.0.43/webapps/
echo "CAMBIOS EFECTUADOS"
'
fi

