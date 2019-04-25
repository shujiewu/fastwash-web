/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
'use strict'

var $protobuf = require('protobufjs/light')

var $root = ($protobuf.roots['default'] || ($protobuf.roots['default'] = new $protobuf.Root()))
  .addJSON({
    sputnik: {
      nested: {
        pb: {
          nested: {
            Box: {
              fields: {
                x: {
                  type: 'int32',
                  id: 1
                },
                y: {
                  type: 'int32',
                  id: 2
                },
                w: {
                  type: 'int32',
                  id: 3
                },
                h: {
                  type: 'int32',
                  id: 4
                }
              }
            },
            Direction: {
              values: {
                UP: 0,
                DOWN: 1,
                LEFT: 2,
                RIGHT: 3
              }
            },
            Facing: {
              values: {
                FRONT: 0,
                BACK: 1,
                SIDE: 2
              }
            },
            FaceLandMarkType: {
              values: {
                FLT_FACE_LANDMARK_9P: 0,
                FLT_FACE_LANDMARK_81P: 1
              }
            },
            FaceLandMark81P: {
              fields: {
                landmarkType: {
                  type: 'FaceLandMarkType',
                  id: 1
                },
                contourChinX: {
                  type: 'float',
                  id: 16
                },
                contourChinY: {
                  type: 'float',
                  id: 17
                },
                contourLeft1X: {
                  type: 'float',
                  id: 18
                },
                contourLeft1Y: {
                  type: 'float',
                  id: 19
                },
                contourLeft2X: {
                  type: 'float',
                  id: 20
                },
                contourLeft2Y: {
                  type: 'float',
                  id: 21
                },
                contourLeft3X: {
                  type: 'float',
                  id: 22
                },
                contourLeft3Y: {
                  type: 'float',
                  id: 23
                },
                contourLeft4X: {
                  type: 'float',
                  id: 24
                },
                contourLeft4Y: {
                  type: 'float',
                  id: 25
                },
                contourLeft5X: {
                  type: 'float',
                  id: 26
                },
                contourLeft5Y: {
                  type: 'float',
                  id: 27
                },
                contourLeft6X: {
                  type: 'float',
                  id: 28
                },
                contourLeft6Y: {
                  type: 'float',
                  id: 29
                },
                contourLeft7X: {
                  type: 'float',
                  id: 30
                },
                contourLeft7Y: {
                  type: 'float',
                  id: 31
                },
                contourLeft8X: {
                  type: 'float',
                  id: 32
                },
                contourLeft8Y: {
                  type: 'float',
                  id: 33
                },
                contourLeft9X: {
                  type: 'float',
                  id: 34
                },
                contourLeft9Y: {
                  type: 'float',
                  id: 35
                },
                contourRight1X: {
                  type: 'float',
                  id: 36
                },
                contourRight1Y: {
                  type: 'float',
                  id: 37
                },
                contourRight2X: {
                  type: 'float',
                  id: 38
                },
                contourRight2Y: {
                  type: 'float',
                  id: 39
                },
                contourRight3X: {
                  type: 'float',
                  id: 40
                },
                contourRight3Y: {
                  type: 'float',
                  id: 41
                },
                contourRight4X: {
                  type: 'float',
                  id: 42
                },
                contourRight4Y: {
                  type: 'float',
                  id: 43
                },
                contourRight5X: {
                  type: 'float',
                  id: 44
                },
                contourRight5Y: {
                  type: 'float',
                  id: 45
                },
                contourRight6X: {
                  type: 'float',
                  id: 46
                },
                contourRight6Y: {
                  type: 'float',
                  id: 47
                },
                contourRight7X: {
                  type: 'float',
                  id: 48
                },
                contourRight7Y: {
                  type: 'float',
                  id: 49
                },
                contourRight8X: {
                  type: 'float',
                  id: 50
                },
                contourRight8Y: {
                  type: 'float',
                  id: 51
                },
                contourRight9X: {
                  type: 'float',
                  id: 52
                },
                contourRight9Y: {
                  type: 'float',
                  id: 53
                },
                leftEyeBottomX: {
                  type: 'float',
                  id: 54
                },
                leftEyeBottomY: {
                  type: 'float',
                  id: 55
                },
                leftEyeLeftCornerX: {
                  type: 'float',
                  id: 56
                },
                leftEyeLeftCornerY: {
                  type: 'float',
                  id: 57
                },
                leftEyeLowerLeftQuarterX: {
                  type: 'float',
                  id: 58
                },
                leftEyeLowerLeftQuarterY: {
                  type: 'float',
                  id: 59
                },
                leftEyeLowerRightQuarterX: {
                  type: 'float',
                  id: 60
                },
                leftEyeLowerRightQuarterY: {
                  type: 'float',
                  id: 61
                },
                lefteyePupilX: {
                  type: 'float',
                  id: 2
                },
                lefteyePupilY: {
                  type: 'float',
                  id: 3
                },
                lefteyeRightCornerX: {
                  type: 'float',
                  id: 12
                },
                lefteyeRightCornerY: {
                  type: 'float',
                  id: 13
                },
                leftEyeTopX: {
                  type: 'float',
                  id: 62
                },
                leftEyeTopY: {
                  type: 'float',
                  id: 63
                },
                leftEyeUpperLeftQuarterX: {
                  type: 'float',
                  id: 64
                },
                leftEyeUpperLeftQuarterY: {
                  type: 'float',
                  id: 65
                },
                leftEyeUpperRightQuarterX: {
                  type: 'float',
                  id: 66
                },
                leftEyeUpperRightQuarterY: {
                  type: 'float',
                  id: 67
                },
                leftEyebrowLeftCornerX: {
                  type: 'float',
                  id: 68
                },
                leftEyebrowLeftCornerY: {
                  type: 'float',
                  id: 69
                },
                leftEyebrowLowerLeftQuarterX: {
                  type: 'float',
                  id: 70
                },
                leftEyebrowLowerLeftQuarterY: {
                  type: 'float',
                  id: 71
                },
                leftEyebrowLowerMiddleX: {
                  type: 'float',
                  id: 72
                },
                leftEyebrowLowerMiddleY: {
                  type: 'float',
                  id: 73
                },
                leftEyebrowLowerRightQuarterX: {
                  type: 'float',
                  id: 74
                },
                leftEyebrowLowerRightQuarterY: {
                  type: 'float',
                  id: 75
                },
                leftEyebrowRightCornerX: {
                  type: 'float',
                  id: 76
                },
                leftEyebrowRightCornerY: {
                  type: 'float',
                  id: 77
                },
                leftEyebrowUpperLeftQuarterX: {
                  type: 'float',
                  id: 78
                },
                leftEyebrowUpperLeftQuarterY: {
                  type: 'float',
                  id: 79
                },
                leftEyebrowUpperMiddleX: {
                  type: 'float',
                  id: 80
                },
                leftEyebrowUpperMiddleY: {
                  type: 'float',
                  id: 81
                },
                leftEyebrowUpperRightQuarterX: {
                  type: 'float',
                  id: 82
                },
                leftEyebrowUpperRightQuarterY: {
                  type: 'float',
                  id: 83
                },
                leftMouthCornerX: {
                  type: 'float',
                  id: 8
                },
                leftMouthCornerY: {
                  type: 'float',
                  id: 9
                },
                mouthLowerLipBottomX: {
                  type: 'float',
                  id: 84
                },
                mouthLowerLipBottomY: {
                  type: 'float',
                  id: 85
                },
                mouthLowerLipLeftContour1X: {
                  type: 'float',
                  id: 86
                },
                mouthLowerLipLeftContour1Y: {
                  type: 'float',
                  id: 87
                },
                mouthLowerLipLeftContour2X: {
                  type: 'float',
                  id: 88
                },
                mouthLowerLipLeftContour2Y: {
                  type: 'float',
                  id: 89
                },
                mouthLowerLipLeftContour3X: {
                  type: 'float',
                  id: 90
                },
                mouthLowerLipLeftContour3Y: {
                  type: 'float',
                  id: 91
                },
                mouthLowerLipRightContour1X: {
                  type: 'float',
                  id: 92
                },
                mouthLowerLipRightContour1Y: {
                  type: 'float',
                  id: 93
                },
                mouthLowerLipRightContour2X: {
                  type: 'float',
                  id: 94
                },
                mouthLowerLipRightContour2Y: {
                  type: 'float',
                  id: 95
                },
                mouthLowerLipRightContour3X: {
                  type: 'float',
                  id: 96
                },
                mouthLowerLipRightContour3Y: {
                  type: 'float',
                  id: 97
                },
                mouthLowerLipTopX: {
                  type: 'float',
                  id: 98
                },
                mouthLowerLipTopY: {
                  type: 'float',
                  id: 99
                },
                rightMouthCornerX: {
                  type: 'float',
                  id: 10
                },
                rightMouthCornerY: {
                  type: 'float',
                  id: 11
                },
                mouthUpperLipBottomX: {
                  type: 'float',
                  id: 100
                },
                mouthUpperLipBottomY: {
                  type: 'float',
                  id: 101
                },
                mouthUpperLipLeftContour1X: {
                  type: 'float',
                  id: 102
                },
                mouthUpperLipLeftContour1Y: {
                  type: 'float',
                  id: 103
                },
                mouthUpperLipLeftContour2X: {
                  type: 'float',
                  id: 104
                },
                mouthUpperLipLeftContour2Y: {
                  type: 'float',
                  id: 105
                },
                mouthUpperLipLeftContour3X: {
                  type: 'float',
                  id: 106
                },
                mouthUpperLipLeftContour3Y: {
                  type: 'float',
                  id: 107
                },
                mouthUpperLipRightContour1X: {
                  type: 'float',
                  id: 108
                },
                mouthUpperLipRightContour1Y: {
                  type: 'float',
                  id: 109
                },
                mouthUpperLipRightContour2X: {
                  type: 'float',
                  id: 110
                },
                mouthUpperLipRightContour2Y: {
                  type: 'float',
                  id: 111
                },
                mouthUpperLipRightContour3X: {
                  type: 'float',
                  id: 112
                },
                mouthUpperLipRightContour3Y: {
                  type: 'float',
                  id: 113
                },
                mouthUpperLipTopX: {
                  type: 'float',
                  id: 114
                },
                mouthUpperLipTopY: {
                  type: 'float',
                  id: 115
                },
                noseContourLeft1X: {
                  type: 'float',
                  id: 116
                },
                noseContourLeft1Y: {
                  type: 'float',
                  id: 117
                },
                noseContourLeft2X: {
                  type: 'float',
                  id: 118
                },
                noseContourLeft2Y: {
                  type: 'float',
                  id: 119
                },
                noseContourLeft3X: {
                  type: 'float',
                  id: 120
                },
                noseContourLeft3Y: {
                  type: 'float',
                  id: 121
                },
                noseContourLowerMiddleX: {
                  type: 'float',
                  id: 122
                },
                noseContourLowerMiddleY: {
                  type: 'float',
                  id: 123
                },
                noseContourRight1X: {
                  type: 'float',
                  id: 124
                },
                noseContourRight1Y: {
                  type: 'float',
                  id: 125
                },
                noseContourRight2X: {
                  type: 'float',
                  id: 126
                },
                noseContourRight2Y: {
                  type: 'float',
                  id: 127
                },
                noseContourRight3X: {
                  type: 'float',
                  id: 128
                },
                noseContourRight3Y: {
                  type: 'float',
                  id: 129
                },
                noseLeftX: {
                  type: 'float',
                  id: 130
                },
                noseLeftY: {
                  type: 'float',
                  id: 131
                },
                noseRightX: {
                  type: 'float',
                  id: 132
                },
                noseRightY: {
                  type: 'float',
                  id: 133
                },
                noseTipX: {
                  type: 'float',
                  id: 6
                },
                noseTipY: {
                  type: 'float',
                  id: 7
                },
                rightEyeBottomX: {
                  type: 'float',
                  id: 134
                },
                rightEyeBottomY: {
                  type: 'float',
                  id: 135
                },
                righteyeLeftCornerX: {
                  type: 'float',
                  id: 14
                },
                righteyeLeftCornerY: {
                  type: 'float',
                  id: 15
                },
                rightEyeLowerLeftQuarterX: {
                  type: 'float',
                  id: 136
                },
                rightEyeLowerLeftQuarterY: {
                  type: 'float',
                  id: 137
                },
                rightEyeLowerRightQuarterX: {
                  type: 'float',
                  id: 138
                },
                rightEyeLowerRightQuarterY: {
                  type: 'float',
                  id: 139
                },
                righteyePupilX: {
                  type: 'float',
                  id: 4
                },
                righteyePupilY: {
                  type: 'float',
                  id: 5
                },
                rightEyeRightCornerX: {
                  type: 'float',
                  id: 140
                },
                rightEyeRightCornerY: {
                  type: 'float',
                  id: 141
                },
                rightEyeTopX: {
                  type: 'float',
                  id: 142
                },
                rightEyeTopY: {
                  type: 'float',
                  id: 143
                },
                rightEyeUpperLeftQuarterX: {
                  type: 'float',
                  id: 144
                },
                rightEyeUpperLeftQuarterY: {
                  type: 'float',
                  id: 145
                },
                rightEyeUpperRightQuarterX: {
                  type: 'float',
                  id: 146
                },
                rightEyeUpperRightQuarterY: {
                  type: 'float',
                  id: 147
                },
                rightEyebrowLeftCornerX: {
                  type: 'float',
                  id: 148
                },
                rightEyebrowLeftCornerY: {
                  type: 'float',
                  id: 149
                },
                rightEyebrowLowerLeftQuarterX: {
                  type: 'float',
                  id: 150
                },
                rightEyebrowLowerLeftQuarterY: {
                  type: 'float',
                  id: 151
                },
                rightEyebrowLowerMiddleX: {
                  type: 'float',
                  id: 152
                },
                rightEyebrowLowerMiddleY: {
                  type: 'float',
                  id: 153
                },
                rightEyebrowLowerRightQuarterX: {
                  type: 'float',
                  id: 154
                },
                rightEyebrowLowerRightQuarterY: {
                  type: 'float',
                  id: 155
                },
                rightEyebrowRightCornerX: {
                  type: 'float',
                  id: 156
                },
                rightEyebrowRightCornerY: {
                  type: 'float',
                  id: 157
                },
                rightEyebrowUpperLeftQuarterX: {
                  type: 'float',
                  id: 158
                },
                rightEyebrowUpperLeftQuarterY: {
                  type: 'float',
                  id: 159
                },
                rightEyebrowUpperMiddleX: {
                  type: 'float',
                  id: 160
                },
                rightEyebrowUpperMiddleY: {
                  type: 'float',
                  id: 161
                },
                rightEyebrowUpperRightQuarterX: {
                  type: 'float',
                  id: 162
                },
                rightEyebrowUpperRightQuarterY: {
                  type: 'float',
                  id: 163
                }
              }
            },
            FaceLandMark: {
              fields: {
                landmarkDescription: {
                  type: 'string',
                  id: 1
                },
                lefteyePupilX: {
                  type: 'int32',
                  id: 2
                },
                lefteyePupilY: {
                  type: 'int32',
                  id: 3
                },
                righteyePupilX: {
                  type: 'int32',
                  id: 4
                },
                righteyePupilY: {
                  type: 'int32',
                  id: 5
                },
                noseTipX: {
                  type: 'int32',
                  id: 6
                },
                noseTipY: {
                  type: 'int32',
                  id: 7
                },
                leftMouthCornerX: {
                  type: 'int32',
                  id: 8
                },
                leftMouthCornerY: {
                  type: 'int32',
                  id: 9
                },
                rightMouthCornerX: {
                  type: 'int32',
                  id: 10
                },
                rightMouthCornerY: {
                  type: 'int32',
                  id: 11
                },
                lefteyeRightCornerX: {
                  type: 'int32',
                  id: 12
                },
                lefteyeRightCornerY: {
                  type: 'int32',
                  id: 13
                },
                righteyeLeftCornerX: {
                  type: 'int32',
                  id: 14
                },
                righteyeLeftCornerY: {
                  type: 'int32',
                  id: 15
                }
              }
            },
            FaceAttribute: {
              fields: {
                blur: {
                  type: 'int32',
                  id: 1
                },
                age: {
                  type: 'int32',
                  id: 2
                },
                gender: {
                  type: 'int32',
                  id: 3
                },
                pitch: {
                  type: 'sint32',
                  id: 4
                },
                yaw: {
                  type: 'sint32',
                  id: 5
                },
                roll: {
                  type: 'sint32',
                  id: 6
                },
                postFilterScore: {
                  type: 'int32',
                  id: 7
                },
                landmark: {
                  type: 'FaceLandMark',
                  id: 8
                },
                landmark_81p: {
                  type: 'FaceLandMark81P',
                  id: 11
                },
                minority: {
                  type: 'int32',
                  id: 9
                },
                livenessScore: {
                  type: 'int32',
                  id: 10
                }
              }
            },
            FaceFeature: {
              fields: {
                featureId: {
                  type: 'int32',
                  id: 2
                },
                blob: {
                  type: 'bytes',
                  id: 1
                }
              }
            },
            FaceRecord: {
              fields: {
                token: {
                  type: 'int32',
                  id: 1
                },
                activation: {
                  type: 'bool',
                  id: 2
                },
                blob: {
                  type: 'bytes',
                  id: 3
                },
                featureVersion: {
                  type: 'FaceFeatureVersion',
                  id: 4
                },
                checksum: {
                  type: 'uint64',
                  id: 5
                }
              }
            },
            FaceLibrary: {
              fields: {
                records: {
                  rule: 'repeated',
                  type: 'FaceRecord',
                  id: 1
                }
              }
            },
            FaceFile: {
              oneofs: {
                file: {
                  oneof: [
                    'library',
                    'model'
                  ]
                }
              },
              fields: {
                library: {
                  type: 'FaceLibrary',
                  id: 1
                },
                model: {
                  type: 'bytes',
                  id: 2
                },
                checksum: {
                  type: 'uint64',
                  id: 3
                }
              }
            },
            TokenScore: {
              fields: {
                token: {
                  type: 'int32',
                  id: 1
                },
                score: {
                  type: 'double',
                  id: 2
                }
              }
            },
            FaceAttributeReplyStatus: {
              values: {
                ARS_UNKNOWN: 0,
                ARS_SUCCESS: 1,
                ARS_NO_FACE: 2,
                ARS_NO_MODEL: 3
              }
            },
            FaceAttributeReply: {
              fields: {
                status: {
                  type: 'FaceAttributeReplyStatus',
                  id: 1
                },
                attribute: {
                  type: 'FaceAttribute',
                  id: 2
                }
              }
            },
            FaceQuality: {
              values: {
                FQ_UNKNOWN: 0,
                FQ_GOOD: 1,
                FQ_TOO_SMALL: 2,
                FQ_TOO_LARGE_PITCH: 3,
                FQ_TOO_LARGE_YAW: 4,
                FQ_TOO_LARGE_ROLL: 5,
                FQ_TOO_BLUR: 6,
                FQ_NO_FACE: 7
              }
            },
            FaceTokenReplyStatus: {
              values: {
                FTRS_UNKNOWN: 0,
                FTRS_SUCCESS: 1,
                FTRS_NO_FACE: 2,
                FTRS_MULTIPLE_FACES: 3,
                FTRS_LOW_QUALITY_FACE: 4,
                FTRS_TIMEOUT: 5,
                FTRS_NO_MODEL: 6
              }
            },
            FaceFeatureVersion: {
              fields: {
                modelVersion: {
                  type: 'string',
                  id: 1
                },
                method: {
                  type: 'string',
                  id: 2
                },
                encryptFeature: {
                  type: 'bool',
                  id: 3
                }
              }
            },
            FaceTokenReply: {
              fields: {
                status: {
                  type: 'FaceTokenReplyStatus',
                  id: 1
                },
                faceQuality: {
                  type: 'FaceQuality',
                  id: 2
                },
                token: {
                  type: 'int32',
                  id: 3
                },
                blob: {
                  type: 'bytes',
                  id: 4
                }
              }
            },
            GroupTokenScore: {
              fields: {
                groupId: {
                  type: 'int32',
                  id: 1
                },
                scores: {
                  rule: 'repeated',
                  type: 'TokenScore',
                  id: 2
                }
              }
            },
            FaceRecognitionReply: {
              fields: {
                tokenReply: {
                  type: 'FaceTokenReply',
                  id: 1
                },
                scores: {
                  rule: 'repeated',
                  type: 'TokenScore',
                  id: 2
                },
                featureVersion: {
                  type: 'FaceFeatureVersion',
                  id: 3
                },
                groupScores: {
                  rule: 'repeated',
                  type: 'GroupTokenScore',
                  id: 4
                }
              }
            },
            FaceReply: {
              fields: {
                faceAttributeReply: {
                  type: 'FaceAttributeReply',
                  id: 1
                },
                faceRecognitionReply: {
                  type: 'FaceRecognitionReply',
                  id: 2
                }
              }
            },
            DetectReplyStatus: {
              values: {
                DRS_UNKNOWN: 0,
                DRS_SUCCESS: 1,
                DRS_FAILED: 2
              }
            },
            DetectReply: {
              fields: {
                status: {
                  type: 'DetectReplyStatus',
                  id: 1
                }
              }
            },
            FaceAttributeRequest: {
              fields: {
                predictBlur: {
                  type: 'bool',
                  id: 1
                },
                predictAgeGender: {
                  type: 'bool',
                  id: 2
                },
                predictPose: {
                  type: 'bool',
                  id: 3
                },
                predictLandmark: {
                  type: 'bool',
                  id: 4
                },
                predictPostfilter: {
                  type: 'bool',
                  id: 5
                },
                predictLiveness: {
                  type: 'bool',
                  id: 6
                },
                predictAabb: {
                  type: 'bool',
                  id: 7
                }
              }
            },
            FacePoseRequirement: {
              fields: {
                minPitchDeg: {
                  type: 'int32',
                  id: 1
                },
                maxPitchDeg: {
                  type: 'int32',
                  id: 2
                },
                minYawDeg: {
                  type: 'int32',
                  id: 3
                },
                maxYawDeg: {
                  type: 'int32',
                  id: 4
                },
                minRollDeg: {
                  type: 'int32',
                  id: 5
                },
                maxRollDeg: {
                  type: 'int32',
                  id: 6
                }
              }
            },
            FaceBlurRequirement: {
              fields: {
                maxBlur: {
                  type: 'int32',
                  id: 1
                }
              }
            },
            FaceTokenRequest: {
              fields: {
                addNewToken: {
                  type: 'bool',
                  id: 1
                },
                model: {
                  type: 'string',
                  id: 2
                },
                strategy: {
                  type: 'string',
                  id: 3
                },
                alreadyAligned: {
                  type: 'bool',
                  id: 4
                },
                minFacePixels: {
                  type: 'int32',
                  id: 5
                },
                poseRequirement: {
                  type: 'FacePoseRequirement',
                  id: 6
                },
                blurRequirement: {
                  type: 'FaceBlurRequirement',
                  id: 7
                },
                disableMatch: {
                  type: 'bool',
                  id: 8
                },
                forceGetFeature: {
                  type: 'bool',
                  id: 9
                }
              }
            },
            FaceRecognitionRequest: {
              fields: {
                maxNumScores: {
                  type: 'int32',
                  id: 1
                },
                precision: {
                  type: 'int32',
                  id: 2
                },
                tokenRequest: {
                  type: 'FaceTokenRequest',
                  id: 3
                },
                excludeMatchGroupIds: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 4
                }
              }
            },
            FaceRequest: {
              oneofs: {
                image: {
                  oneof: [
                    'rawImage',
                    'encodedImage'
                  ]
                }
              },
              fields: {
                rawImage: {
                  type: 'Image',
                  id: 1
                },
                encodedImage: {
                  type: 'EncodedImage',
                  id: 2
                },
                boxInImage: {
                  type: 'Box',
                  id: 3
                },
                landmark: {
                  type: 'FaceLandMark',
                  id: 4
                },
                landmark_81p: {
                  type: 'FaceLandMark81P',
                  id: 9
                },
                attributeRequest: {
                  type: 'FaceAttributeRequest',
                  id: 5
                },
                recognitionRequest: {
                  type: 'FaceRecognitionRequest',
                  id: 6
                },
                priority: {
                  type: 'int32',
                  id: 8
                },
                trackId: {
                  type: 'int32',
                  id: 7
                }
              }
            },
            DetectRequest: {
              oneofs: {
                image: {
                  oneof: [
                    'rawImage',
                    'encodedImage'
                  ]
                }
              },
              fields: {
                rawImage: {
                  type: 'Image',
                  id: 1
                },
                encodedImage: {
                  type: 'EncodedImage',
                  id: 2
                }
              }
            },
            RawImageFormat: {
              values: {
                RIF_BGR: 0,
                RIF_YUV: 1
              }
            },
            Image: {
              fields: {
                h: {
                  type: 'int32',
                  id: 1
                },
                w: {
                  type: 'int32',
                  id: 2
                },
                c: {
                  type: 'int32',
                  id: 3
                },
                data: {
                  type: 'bytes',
                  id: 4
                },
                format: {
                  type: 'RawImageFormat',
                  id: 5
                }
              }
            },
            ImageEncodeFormat: {
              values: {
                IEF_UNKNOWN: 0,
                IEF_PNG: 1,
                IEF_JPG: 2,
                IEF_BMP: 3
              }
            },
            EncodedImage: {
              fields: {
                blob: {
                  type: 'bytes',
                  id: 1
                },
                encodeFormat: {
                  type: 'ImageEncodeFormat',
                  id: 2
                },
                description: {
                  type: 'string',
                  id: 3
                }
              }
            },
            VerifyFileReplyStatus: {
              values: {
                VFRS_UNKNOWN: 0,
                VFRS_SUCCESS: 1,
                VFRS_MISMATCH: 2,
                VFRS_NO_FILE: 3
              }
            },
            VerifyFileReply: {
              fields: {
                status: {
                  type: 'VerifyFileReplyStatus',
                  id: 1
                }
              }
            },
            WriteFileReplyStatus: {
              values: {
                WFRS_UNKNOWN: 0,
                WFRS_SUCCESS: 1,
                WFRS_NO_SPACE_LEFT: 2,
                WFRS_WRITE_FAILED: 3,
                WFRS_CANNOT_OVERWRITE: 4
              }
            },
            WriteFileReply: {
              fields: {
                status: {
                  type: 'WriteFileReplyStatus',
                  id: 1
                }
              }
            },
            FileReply: {
              oneofs: {
                content: {
                  oneof: [
                    'verifyFileReply',
                    'writeFileReply'
                  ]
                }
              },
              fields: {
                requestId: {
                  type: 'int32',
                  id: 1
                },
                errorMessage: {
                  type: 'string',
                  id: 2
                },
                verifyFileReply: {
                  type: 'VerifyFileReply',
                  id: 3
                },
                writeFileReply: {
                  type: 'WriteFileReply',
                  id: 4
                }
              }
            },
            VerifyFileRequest: {
              fields: {
                path: {
                  type: 'string',
                  id: 1
                },
                checksum: {
                  type: 'string',
                  id: 2
                },
                checksumMethod: {
                  type: 'string',
                  id: 3
                }
              }
            },
            WriteFileRequest: {
              fields: {
                path: {
                  type: 'string',
                  id: 1
                },
                content: {
                  type: 'bytes',
                  id: 2
                }
              }
            },
            FileRequest: {
              oneofs: {
                request: {
                  oneof: [
                    'verifyFileRequest',
                    'writeFileRequest'
                  ]
                }
              },
              fields: {
                requestId: {
                  type: 'int32',
                  id: 1
                },
                verifyFileRequest: {
                  type: 'VerifyFileRequest',
                  id: 2
                },
                writeFileRequest: {
                  type: 'WriteFileRequest',
                  id: 3
                },
                timestampMillis: {
                  type: 'int64',
                  id: 4
                }
              }
            },
            FrameResult: {
              fields: {
                frameId: {
                  type: 'int32',
                  id: 1
                },
                items: {
                  rule: 'repeated',
                  type: 'Item',
                  id: 2
                },
                DEPRECATEDEnd: {
                  type: 'bool',
                  id: 3
                },
                version: {
                  type: 'string',
                  id: 4
                },
                panesFrameId: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 5
                },
                nrItemsPerPane: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 6
                },
                keepFrameIds: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 7
                },
                panesFrameTs: {
                  rule: 'repeated',
                  type: 'uint64',
                  id: 8
                },
                detImg: {
                  type: 'EncodedImage',
                  id: 9
                }
              }
            },
            ItemType: {
              values: {
                FACE: 0,
                PLATE: 1,
                VEHICLE: 2,
                HUMAN: 3,
                HEAD: 4,
                ANIMAL: 5,
                THING: 6
              }
            },
            Item: {
              oneofs: {
                attribute: {
                  oneof: [
                    'faceAttribute',
                    'plateAttribute',
                    'vehicleAttribute',
                    'humanAttribute'
                  ]
                }
              },
              fields: {
                type: {
                  type: 'ItemType',
                  id: 1
                },
                box: {
                  type: 'Box',
                  id: 2
                },
                videoChannelId: {
                  type: 'int32',
                  id: 19
                },
                frameId: {
                  type: 'int32',
                  id: 3
                },
                trackId: {
                  type: 'int32',
                  id: 4
                },
                clusterId: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 26
                },
                trackUpdate: {
                  type: 'bool',
                  id: 5
                },
                updateBox: {
                  type: 'Box',
                  id: 20
                },
                trackDie: {
                  type: 'bool',
                  id: 6
                },
                trackShow: {
                  type: 'bool',
                  id: 7
                },
                trackPush: {
                  type: 'bool',
                  id: 8
                },
                trackLength: {
                  type: 'int32',
                  id: 29
                },
                faceAttribute: {
                  type: 'FaceAttribute',
                  id: 9
                },
                plateAttribute: {
                  type: 'PlateAttribute',
                  id: 10
                },
                vehicleAttribute: {
                  type: 'VehicleAttribute',
                  id: 11
                },
                humanAttribute: {
                  type: 'HumanAttribute',
                  id: 13
                },
                itemImage: {
                  type: 'Image',
                  id: 12
                },
                encodedItemImage: {
                  type: 'EncodedImage',
                  id: 25
                },
                mask: {
                  type: 'Mask',
                  id: 14
                },
                timestampMillis: {
                  type: 'int64',
                  id: 15
                },
                trace: {
                  rule: 'repeated',
                  type: 'TracePoint',
                  id: 16
                },
                itemTextUtf8: {
                  type: 'string',
                  id: 17
                },
                blob: {
                  type: 'bytes',
                  id: 18
                },
                goodness: {
                  type: 'double',
                  id: 21
                },
                feature: {
                  type: 'FaceFeature',
                  id: 22
                },
                featureVersion: {
                  type: 'FaceFeatureVersion',
                  id: 23
                },
                scores: {
                  rule: 'repeated',
                  type: 'TokenScore',
                  id: 24
                },
                groupScores: {
                  rule: 'repeated',
                  type: 'GroupTokenScore',
                  id: 27
                },
                algorithmVersion: {
                  type: 'string',
                  id: 28
                }
              }
            },
            PlateColorType: {
              values: {
                PLATE_BLUE: 0,
                PLATE_YELLOW: 1,
                PLATE_BLACK: 2,
                PLATE_WHITE: 3,
                PLATE_GREEN: 4,
                PLATE_SMALL_NEW_ENERGY: 5,
                PLATE_LARGE_NEW_ENERGY: 6,
                PLATE_ABSENCE: 7
              }
            },
            PlateToken: {
              fields: {
                strUtf8: {
                  type: 'string',
                  id: 1
                },
                confidence: {
                  type: 'int32',
                  id: 2
                }
              }
            },
            PlateAttribute: {
              fields: {
                roll: {
                  type: 'sint32',
                  id: 1
                },
                plateNumbers: {
                  rule: 'repeated',
                  type: 'PlateTextPredict',
                  id: 9
                },
                quality: {
                  type: 'int32',
                  id: 3
                },
                colorPredicts: {
                  rule: 'repeated',
                  type: 'PlateColorPredict',
                  id: 5
                },
                foutPoints: {
                  type: 'FourPoints',
                  id: 6
                },
                plateStyle: {
                  type: 'int32',
                  id: 7
                },
                adversaryOcclusion: {
                  type: 'int32',
                  id: 8
                },
                postFilterScore: {
                  type: 'int32',
                  id: 10
                }
              },
              nested: {
                PlateTextPredict: {
                  fields: {
                    strUtf8: {
                      type: 'string',
                      id: 1
                    },
                    confidence: {
                      type: 'int32',
                      id: 2
                    },
                    tokens: {
                      rule: 'repeated',
                      type: 'PlateToken',
                      id: 3
                    }
                  }
                },
                PlateColorPredict: {
                  fields: {
                    colorType: {
                      type: 'PlateColorType',
                      id: 1
                    },
                    colorConfidence: {
                      type: 'int32',
                      id: 2
                    }
                  }
                },
                FourPoints: {
                  fields: {
                    leftTopX: {
                      type: 'int32',
                      id: 1
                    },
                    leftTopY: {
                      type: 'int32',
                      id: 2
                    },
                    rightTopX: {
                      type: 'int32',
                      id: 3
                    },
                    rightTopY: {
                      type: 'int32',
                      id: 4
                    },
                    rightBottomX: {
                      type: 'int32',
                      id: 5
                    },
                    rightBottomY: {
                      type: 'int32',
                      id: 6
                    },
                    leftBottomX: {
                      type: 'int32',
                      id: 7
                    },
                    leftBottomY: {
                      type: 'int32',
                      id: 8
                    }
                  }
                }
              }
            },
            VehicleType: {
              values: {
                CAR: 0,
                SUV: 1,
                MICROBUS: 2,
                MINIBUS: 3,
                BUS: 4,
                PICKUP: 5,
                TRUCK: 6
              }
            },
            VehicleColor: {
              values: {
                BLUE: 0,
                YELLOW: 1,
                BLACK: 2,
                WHITE: 3,
                GREEN: 4,
                RED: 5,
                GRAY: 6,
                PURPLE: 7,
                PINK: 8,
                BROWN: 9,
                CYAN: 10,
                COLORFUL: 11
              }
            },
            VehicleAttribute: {
              fields: {
                platePredicts: {
                  rule: 'repeated',
                  type: 'PlatePredict',
                  id: 2
                },
                typePredicts: {
                  rule: 'repeated',
                  type: 'VehicleTypePredict',
                  id: 3
                },
                colorPredicts: {
                  rule: 'repeated',
                  type: 'VehicleColorPredict',
                  id: 4
                },
                trademarkUtf8: {
                  type: 'string',
                  id: 5
                },
                trademarkUtf8Confidence: {
                  type: 'int32',
                  id: 11
                },
                vehiclePlateless: {
                  type: 'int32',
                  id: 6
                },
                vehicleMoving: {
                  type: 'int32',
                  id: 7
                },
                moveDirection: {
                  type: 'Direction',
                  id: 8
                },
                moveDirectionConfidence: {
                  type: 'int32',
                  id: 10
                },
                pointingDirection: {
                  type: 'Direction',
                  id: 14
                },
                pointingDirectionConfidence: {
                  type: 'int32',
                  id: 15
                },
                vehicleFacing: {
                  type: 'Facing',
                  id: 12
                },
                vehicleFacingConfidence: {
                  type: 'int32',
                  id: 13
                },
                postFilterScore: {
                  type: 'int32',
                  id: 16
                }
              },
              nested: {
                PlatePredict: {
                  fields: {
                    plateRelativeBox: {
                      type: 'Box',
                      id: 1
                    },
                    plateAttribute: {
                      type: 'PlateAttribute',
                      id: 2
                    }
                  }
                },
                VehicleTypePredict: {
                  fields: {
                    vehicleType: {
                      type: 'VehicleType',
                      id: 1
                    },
                    typeConfidence: {
                      type: 'int32',
                      id: 2
                    }
                  }
                },
                VehicleColorPredict: {
                  fields: {
                    vehicleColor: {
                      type: 'VehicleColor',
                      id: 1
                    },
                    colorConfidence: {
                      type: 'int32',
                      id: 2
                    }
                  }
                }
              }
            },
            HumanAttribute: {
              fields: {
                gender: {
                  type: 'int32',
                  id: 1
                },
                age: {
                  type: 'int32',
                  id: 2
                },
                backpack: {
                  type: 'int32',
                  id: 3
                },
                humanMove: {
                  type: 'int32',
                  id: 4
                },
                moveDirection: {
                  type: 'Direction',
                  id: 5
                },
                rideBike: {
                  type: 'int32',
                  id: 6
                },
                rideMotorbike: {
                  type: 'int32',
                  id: 7
                },
                humanFaceVisible: {
                  type: 'int32',
                  id: 8
                },
                humanFacing: {
                  type: 'Facing',
                  id: 9
                },
                humanFacingConfidence: {
                  type: 'int32',
                  id: 10
                },
                quality: {
                  type: 'int32',
                  id: 11
                },
                postFilterScore: {
                  type: 'int32',
                  id: 12
                }
              }
            },
            Mask: {
              fields: {
                x: {
                  type: 'int32',
                  id: 1
                },
                y: {
                  type: 'int32',
                  id: 2
                },
                w: {
                  type: 'int32',
                  id: 3
                },
                h: {
                  type: 'int32',
                  id: 4
                },
                resolution: {
                  type: 'int32',
                  id: 5
                },
                pixConfidence: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 6
                }
              }
            },
            TracePoint: {
              fields: {
                x: {
                  type: 'int32',
                  id: 1
                },
                y: {
                  type: 'int32',
                  id: 2
                },
                timestampMillis: {
                  type: 'int64',
                  id: 3
                }
              }
            },
            BuildGroupReplyStatus: {
              values: {
                BGRS_UNKNOWN: 0,
                BGRS_SUCCESS: 1,
                BGRS_FAILED: 2
              }
            },
            BuildGroupReply: {
              fields: {
                status: {
                  type: 'BuildGroupReplyStatus',
                  id: 1
                }
              }
            },
            StopRecognitionCondition: {
              fields: {
                scoreThreshold: {
                  type: 'int32',
                  id: 1
                }
              }
            },
            BuildGroup: {
              fields: {
                groupId: {
                  type: 'int32',
                  id: 1
                },
                tokens: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 2
                },
                topK: {
                  type: 'int32',
                  id: 3
                },
                stopRecogCond: {
                  type: 'StopRecognitionCondition',
                  id: 4
                }
              }
            },
            BuildGroupRequest: {
              fields: {
                buildGroups: {
                  rule: 'repeated',
                  type: 'BuildGroup',
                  id: 1
                }
              }
            },
            Hotspot: {
              fields: {
                timestamp: {
                  type: 'int64',
                  id: 1
                },
                timestampUsec: {
                  type: 'int64',
                  id: 2
                },
                posx: {
                  type: 'int32',
                  id: 3
                },
                posy: {
                  type: 'int32',
                  id: 4
                },
                width: {
                  type: 'int32',
                  id: 5
                },
                height: {
                  type: 'int32',
                  id: 6
                }
              }
            },
            HotSpotData: {
              fields: {
                hotspot: {
                  rule: 'repeated',
                  type: 'Hotspot',
                  id: 1
                }
              }
            },
            InfoReplyStatus: {
              values: {
                IRS_UNKNOWN: 0,
                IRS_SUCCESS: 1,
                IRS_FAILED: 2
              }
            },
            InfoReply: {
              fields: {
                status: {
                  type: 'InfoReplyStatus',
                  id: 1
                },
                featureVersion: {
                  type: 'FaceFeatureVersion',
                  id: 2
                },
                version: {
                  type: 'string',
                  id: 3
                },
                checksum: {
                  type: 'string',
                  id: 4
                },
                maxSizeFaceLibrary: {
                  type: 'int32',
                  id: 5
                },
                capabilityString: {
                  type: 'string',
                  id: 6
                },
                detector: {
                  type: 'string',
                  id: 7
                }
              }
            },
            InfoRequest: {
              fields: {
                getFaceFeatureVersion: {
                  type: 'bool',
                  id: 1
                },
                getVersion: {
                  type: 'bool',
                  id: 2
                },
                getFeatureChecksum: {
                  type: 'bool',
                  id: 3
                },
                getCapability: {
                  type: 'bool',
                  id: 4
                },
                getDetectorVersion: {
                  type: 'bool',
                  id: 5
                }
              }
            },
            LogLine: {
              fields: {
                log: {
                  type: 'string',
                  id: 1
                },
                timestampMillis: {
                  type: 'int64',
                  id: 2
                },
                sinceRebootMillis: {
                  type: 'int64',
                  id: 3
                },
                level: {
                  type: 'LogLevel',
                  id: 4
                }
              }
            },
            LogStream: {
              fields: {
                lines: {
                  rule: 'repeated',
                  type: 'LogLine',
                  id: 2
                }
              }
            },
            LogReply: {
              fields: {
                level: {
                  type: 'LogLevel',
                  id: 1
                },
                logStream: {
                  type: 'LogStream',
                  id: 2
                }
              }
            },
            LogLevel: {
              values: {
                LL_UNCHANGED: 0,
                LL_DEBUG: 1,
                LL_INFO: 2,
                LL_WARNING: 3,
                LL_ERROR: 4,
                LL_FATAL: 5
              }
            },
            LogRequest: {
              fields: {
                level: {
                  type: 'LogLevel',
                  id: 1
                }
              }
            },
            BatchFaceReply: {
              fields: {
                faceReplies: {
                  rule: 'repeated',
                  type: 'FaceReply',
                  id: 1
                }
              }
            },
            RegressionInfo: {
              fields: {
                elapsedMs: {
                  keyType: 'string',
                  type: 'double',
                  id: 1
                }
              }
            },
            MegReply: {
              oneofs: {
                content: {
                  oneof: [
                    'faceReply',
                    'tokenActivationReplay',
                    'deleteTokenReply',
                    'groupReply',
                    'infoReply',
                    'batchFaceReply',
                    'addFeatureReply',
                    'runModelReply',
                    'detectReply'
                  ]
                }
              },
              fields: {
                requestId: {
                  type: 'int32',
                  id: 1
                },
                errorMessage: {
                  type: 'string',
                  id: 2
                },
                faceReply: {
                  type: 'FaceReply',
                  id: 3
                },
                tokenActivationReplay: {
                  type: 'TokenActivationReply',
                  id: 4
                },
                deleteTokenReply: {
                  type: 'DeleteTokenReply',
                  id: 5
                },
                groupReply: {
                  type: 'BuildGroupReply',
                  id: 6
                },
                infoReply: {
                  type: 'InfoReply',
                  id: 7
                },
                batchFaceReply: {
                  type: 'BatchFaceReply',
                  id: 8
                },
                addFeatureReply: {
                  type: 'AddFeatureReply',
                  id: 10
                },
                runModelReply: {
                  type: 'RunModelReply',
                  id: 11
                },
                detectReply: {
                  type: 'DetectReply',
                  id: 13
                },
                timestampMillis: {
                  type: 'int64',
                  id: 9
                },
                regressionInfo: {
                  type: 'RegressionInfo',
                  id: 12
                }
              }
            },
            TokenActivationReplyStatus: {
              values: {
                TAR_UNKNOWN: 0,
                TAR_SUCCESS: 1,
                TAR_FAILED: 2
              }
            },
            TokenActivationReply: {
              fields: {
                status: {
                  type: 'TokenActivationReplyStatus',
                  id: 1
                },
                activeTokens: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 2
                }
              }
            },
            DeleteTokenReplyStatus: {
              values: {
                DFT_UNKNOWN: 0,
                DFT_SUCCESS: 1,
                DFT_FAILED: 2
              }
            },
            DeleteTokenReply: {
              fields: {
                status: {
                  type: 'DeleteTokenReplyStatus',
                  id: 1
                },
                presentTokens: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 2
                }
              }
            },
            AddFeatureReplyStatus: {
              values: {
                AFT_UNKNOWN: 0,
                AFT_SUCCESS: 1,
                AFT_FAILED: 2
              }
            },
            AddFeatureReply: {
              fields: {
                status: {
                  type: 'AddFeatureReplyStatus',
                  id: 1
                },
                tokens: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 2
                }
              }
            },
            RunModelReplyStatus: {
              values: {
                RMRS_UNKNOWN: 0,
                RMRS_SUCCESS: 1,
                RMRS_FAILED: 2
              }
            },
            OutputMap: {
              fields: {
                kvs: {
                  rule: 'repeated',
                  type: 'KVPair',
                  id: 1
                }
              }
            },
            KVPair: {
              fields: {
                key: {
                  type: 'string',
                  id: 1
                },
                value: {
                  type: 'bytes',
                  id: 2
                }
              }
            },
            RunModelReply: {
              fields: {
                status: {
                  type: 'RunModelReplyStatus',
                  id: 1
                },
                outputMap: {
                  type: 'OutputMap',
                  id: 2
                }
              }
            },
            BatchFaceRequest: {
              fields: {
                faceRequests: {
                  rule: 'repeated',
                  type: 'FaceRequest',
                  id: 1
                }
              }
            },
            MegRequest: {
              oneofs: {
                request: {
                  oneof: [
                    'tokenActivationRequest',
                    'deleteTokenRequest',
                    'faceRequest',
                    'buildGroupRequest',
                    'infoRequest',
                    'batchFaceRequest',
                    'addFeatureRequest',
                    'runModelRequest',
                    'detectRequest'
                  ]
                }
              },
              fields: {
                requestId: {
                  type: 'int32',
                  id: 1
                },
                tokenActivationRequest: {
                  type: 'TokenActivationRequest',
                  id: 2
                },
                deleteTokenRequest: {
                  type: 'DeleteTokenRequest',
                  id: 3
                },
                faceRequest: {
                  type: 'FaceRequest',
                  id: 4
                },
                buildGroupRequest: {
                  type: 'BuildGroupRequest',
                  id: 5
                },
                infoRequest: {
                  type: 'InfoRequest',
                  id: 6
                },
                batchFaceRequest: {
                  type: 'BatchFaceRequest',
                  id: 7
                },
                addFeatureRequest: {
                  type: 'AddFeatureRequest',
                  id: 9
                },
                runModelRequest: {
                  type: 'RunModelRequest',
                  id: 10
                },
                detectRequest: {
                  type: 'DetectRequest',
                  id: 12
                },
                timestampMillis: {
                  type: 'int64',
                  id: 8
                },
                enableRegressionInfo: {
                  type: 'bool',
                  id: 11
                }
              }
            },
            TokenActivation: {
              fields: {
                token: {
                  type: 'int32',
                  id: 1
                },
                active: {
                  type: 'bool',
                  id: 2
                }
              }
            },
            TokenActivationRequest: {
              fields: {
                tokenActivations: {
                  rule: 'repeated',
                  type: 'TokenActivation',
                  id: 1
                }
              }
            },
            DeleteTokenRequest: {
              fields: {
                deleteTokens: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 1
                }
              }
            },
            AddFeatureRequest: {
              fields: {
                features: {
                  rule: 'repeated',
                  type: 'FaceFeature',
                  id: 1
                },
                version: {
                  type: 'FaceFeatureVersion',
                  id: 2
                }
              }
            },
            RunModelRequest: {
              fields: {
                modelPath: {
                  type: 'string',
                  id: 1
                },
                inputNames: {
                  rule: 'repeated',
                  type: 'string',
                  id: 2
                },
                outputNames: {
                  rule: 'repeated',
                  type: 'string',
                  id: 3
                },
                reserveNames: {
                  rule: 'repeated',
                  type: 'string',
                  id: 4
                },
                images: {
                  rule: 'repeated',
                  type: 'TransferImage',
                  id: 5
                }
              },
              nested: {
                TransferImage: {
                  oneofs: {
                    image: {
                      oneof: [
                        'rawImage',
                        'encodedImage'
                      ]
                    }
                  },
                  fields: {
                    rawImage: {
                      type: 'Image',
                      id: 6
                    },
                    encodedImage: {
                      type: 'EncodedImage',
                      id: 7
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

module.exports = $root
