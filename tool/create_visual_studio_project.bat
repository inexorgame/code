
cd %~dp0..
mkdir build
cd build
conan install .. --build=missing -s compiler="Visual Studio" -s compiler.version=14 -s compiler.runtime=MT
conan build ..
