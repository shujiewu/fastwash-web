load("@com_google_protobuf_cc//:protobuf.bzl", "py_proto_library")

proto_library(
    name = "box_proto",
    srcs = ["box.proto"],
)

proto_library(
    name = "image_proto",
    srcs = ["image.proto"],
)

proto_library(
    name = "mask_proto",
    srcs = ["mask.proto"],
)

proto_library(
    name = "direction_proto",
    srcs = ["direction.proto"],
)

proto_library(
    name = "trace_point_proto",
    srcs = ["trace_point.proto"],
)

proto_library(
    name = "face_attribute_proto",
    srcs = ["face_attribute.proto"],
)

proto_library(
    name = "face_feature_proto",
    srcs = ["face_feature.proto"],
)

proto_library(
    name = "plate_attribute_proto",
    srcs = ["plate_attribute.proto"],
)

proto_library(
    name = "human_attribute_proto",
    srcs = ["human_attribute.proto"],
    deps = [":direction_proto"]
)

proto_library(
    name = "vehicle_attribute_proto",
    srcs = ["vehicle_attribute.proto"],
    deps = [":box_proto", ":plate_attribute_proto",
            ":direction_proto"],
)

proto_library(
    name = "item_proto",
    srcs = ["item.proto"],
    deps = [
        ":image_proto", ":box_proto", ":plate_attribute_proto",
        ":face_attribute_proto", ":vehicle_attribute_proto",
        ":human_attribute_proto", ":mask_proto",
        ":trace_point_proto",
        ":face_feature_proto",
        ":face_reply_proto",
    ],
)

proto_library(
    name = "hotspot_proto",
    srcs = ["hotspot.proto"],
)

proto_library(
    name = "frame_result_proto",
    srcs = ["frame_result.proto"],
    deps = [":item_proto", ":image_proto"],
)

proto_library(
    name = "token_request_proto",
    srcs = ["token_request.proto"],
    deps = [":face_reply_proto", ":face_feature_proto"],
)

proto_library(
    name = "token_reply_proto",
    srcs = ["token_reply.proto"],
)

proto_library(
    name = "group_request_proto",
    srcs = ["group_request.proto"],
)

proto_library(
    name = "info_request_proto",
    srcs = ["info_request.proto"],
)

proto_library(
    name = "face_request_proto",
    srcs = ["face_request.proto"],
    deps = [":image_proto", ":box_proto", ":face_attribute_proto"],
)

proto_library(
    name = "face_reply_proto",
    srcs = ["face_reply.proto"],
    deps = [":face_attribute_proto"],
)

proto_library(
    name = "group_reply_proto",
    srcs = ["group_reply.proto"],
)

proto_library(
    name = "info_reply_proto",
    srcs = ["info_reply.proto"],
    deps = [":face_reply_proto"],
)

proto_library(
    name = "run_model_request_proto",
    srcs = ["run_model_request.proto"],
    deps = [":image_proto"],
)

proto_library(
    name = "run_model_reply_proto",
    srcs = ["run_model_reply.proto"],
    deps = [":run_model_request_proto"],
)

proto_library(
    name = "meg_request_proto",
    srcs = ["meg_request.proto"],
    deps = [":face_request_proto", ":token_request_proto", ":group_request_proto", ":run_model_request_proto", ":info_request_proto"],
)

proto_library(
    name = "meg_reply_proto",
    srcs = ["meg_reply.proto"],
    deps = [":face_reply_proto", ":token_reply_proto", ":group_reply_proto", ":run_model_reply_proto", "info_reply_proto"],
)

proto_library(
    name = "file_request_proto",
    srcs = ["file_request.proto"],
)

proto_library(
    name = "file_reply_proto",
    srcs = ["file_reply.proto"],
)

proto_library(
    name = "log_request_proto",
    srcs = ["log_request.proto"],
)

proto_library(
    name = "log_reply_proto",
    srcs = ["log_reply.proto"],
    deps = [":log_request_proto"],
)

proto_library(
    name = "face_file_proto",
    srcs = ["face_file.proto"],
    deps = [":face_reply_proto"],
)

cc_proto_library(
    name = "frame_result_cc_proto",
    deps = [":frame_result_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "hotspot_cc_proto",
    deps = [":hotspot_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "meg_request_cc_proto",
    deps = [":meg_request_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "meg_reply_cc_proto",
    deps = [":meg_reply_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "file_reply_cc_proto",
    deps = [":file_reply_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "file_request_cc_proto",
    deps = [":file_request_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "log_reply_cc_proto",
    deps = [":log_reply_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "log_request_cc_proto",
    deps = [":log_request_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "group_reply_cc_proto",
    deps = [":group_reply_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "group_request_cc_proto",
    deps = [":group_request_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "run_model_reply_cc_proto",
    deps = [":run_model_reply_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "run_model_request_cc_proto",
    deps = [":run_model_request_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "info_reply_cc_proto",
    deps = [":info_reply_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "info_request_cc_proto",
    deps = [":info_request_proto"],
    visibility = [
        "//visibility:public"
        ],
)

cc_proto_library(
    name = "face_file_cc_proto",
    deps = [":face_file_proto"],
    visibility = [
        "//visibility:public"
        ],
)

# FIXME: fix py proto libray dependency problem for py_proto_library to work
#py_proto_library(
#    name = "frame_result_py_proto",
#    srcs = glob(["*.proto"]),
#    protoc = "@com_google_protobuf_cc//:protoc",
#    default_runtime = "@com_google_protobuf_cc//:protobuf_python",
#)

filegroup(
    name = "sputnik_proto_files",
    srcs = glob(["*.proto"], exclude=[])
)

genrule (
    name = "sputnik_py_proto",
    srcs = [":sputnik_proto_files"],
    tools = ["@com_google_protobuf_cc//:protoc"],
    outs = [
        "image_pb2.py", "box_pb2.py",
        "mask_pb2.py", "direction_pb2.py",
        "frame_result_pb2.py", "item_pb2.py",
        "plate_attribute_pb2.py", "vehicle_attribute_pb2.py",
        "human_attribute_pb2.py", "face_attribute_pb2.py",
        "trace_point_pb2.py",
        "face_feature_pb2.py",
        "face_reply_pb2.py", "face_request_pb2.py",
        "token_reply_pb2.py", "token_request_pb2.py",
        "meg_reply_pb2.py", "meg_request_pb2.py",
        "file_reply_pb2.py", "file_request_pb2.py",
        "log_reply_pb2.py", "log_request_pb2.py",
        "group_reply_pb2.py", "group_request_pb2.py",
        "run_model_reply_pb2.py", "run_model_request_pb2.py",
        "info_reply_pb2.py", "info_request_pb2.py",
        "face_file_pb2.py", "hotspot_pb2.py",
    ],
    cmd = "$(location @com_google_protobuf_cc//:protoc) \
            --python_out=$(@D)/../../../../../../ $(locations :sputnik_proto_files)",
)
