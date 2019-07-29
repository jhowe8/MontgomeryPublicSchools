def writeHeader(file):
    file.write('{')
    file.write('"type": "FeatureCollection",')
    file.write('"name": "montgomeryschools",')
    file.write('"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },')
    file.write('"features": [')


def writeJSON(file, stringList):
    for line in stringList:
        file.write(line)


def readFile(file):
    writeLines = []
    foundData = False
    propertiesDict = {0: '"level"',
                      1: '"name"',
                      2: '"address"',
                      3: '"city"',
                      4: '"zip"',
                      5: '"phone"',
                      6: '"website"',
                      7: '"longitude"',
                      8: '"latitude"'}

    for line in file:
        lineToWrite = ""

        if ('"data"' in line):
            foundData = True
        if foundData:
            lineToWrite = '{ "type": "Feature", "properties": { '
            linedata = line.split(',')
            foundSchools = False

            # flag for writing coordinates in geometry
            writeGeoPrefix = True

            # flag for comma after longitude
            writePostLongComma = True

            for property in linedata:
                if "SCHOOLS" in property:
                    foundSchools = True
                    index = 0

                if foundSchools:
                    if index < 7:
                        lineToWrite += propertiesDict[index] + ": " + property

                    if index < 6:
                        lineToWrite += ", "

                    if index >= 7 and index <= 8:
                        if writeGeoPrefix == True:
                            lineToWrite += ' }, "geometry": { "type": "Point", "coordinates": ['
                            writeGeoPrefix = False

                        lineToWrite += property.replace('"', '')
                        if writePostLongComma:
                            lineToWrite += ","
                            writePostLongComma = False

                    index += 1

            lineToWrite += ' ] } },'

        if len(lineToWrite) > 0:
            writeLines.append(lineToWrite)

    # remove last two lines
    writeLines = writeLines[:-2]

    # remove last comma from last line
    writeLines[-1] = writeLines[-1][:-1]

    # end json list
    writeLines.append(']')
    writeLines.append('}')

    return writeLines


def main():
    readfile = open('data.json', 'r')
    linesToWrite = readFile(readfile)

    writefile = open('montgomeryschools.json', 'w')
    writeHeader(writefile)
    writeJSON(writefile, linesToWrite)

main()