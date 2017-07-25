var gulp = require("gulp");
var pocoGen = require('gulp-typescript-cs-poco');
var cleanDest = require('gulp-clean-dest'); 

gulp.task('poco', function () {
  return gulp.src('../../../Modelagem/Modelagem/*.cs')
             .pipe(cleanDest('src/app/models/generated'))
             .pipe(pocoGen({
                customTypeTranslations: { MyCustomStringClass: 'string' },
                ignoreInheritance: ['DbContext'],
                baseNamespace: 'ApiModels',
                typeResolver: function (typeName, scope) {
                    if (!typeName) {
                        return typeName;
                    }

                    if (typeName.indexOf("ObjectResult<") >= 0) {
                       return typeName.replace("ObjectResult<", "").replace(">", "");
                    }

                    if (typeName.indexOf("System.DateTime") >= 0) {
                        return "string";
                    }

                    if (typeName.indexOf("Nullable<") >= 0) {
                       return typeName.replace("Nullable<", "").replace(">", "");
                    }

                    if (typeName.indexOf("DbSet<") >= 0) {
                       return typeName.replace("DbSet<", "").replace(">", "") + "[]";
                    }

                    return typeName;
                }
              }))
             .pipe(gulp.dest('src/app/models/generated'));
})