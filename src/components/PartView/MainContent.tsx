import { useParams } from "react-router-dom";
import { Thumbnail } from "../Thumbnail";
import { DropDownSettings } from "./DropdownSettings";
import { StatView } from "../StatView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIGetPart } from "../../models/APIGetPart.model";
import { Progressbar } from "./ProgressBar";
import { PartBadges } from "./PartBadges";

export const MainContent = () => {
	const param = useParams();
	if (!param.partID) throw new Error("No part id specified!");

	const { isPending, isFetching, error, data } = useQuery({
		queryKey: ["parts"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/${param.partID}`)
				.then((res) => res.data),
	});
	if (error) return <p>An error has occurred: {error.message}</p>;
	const isLoading = isFetching || isPending;
	const part: APIGetPart = data;
	return (
		<>
			<div className="card shadow-xl bg-gray-800 rounded-box flex md:flex-none justify-between my-2">
				<div className="w-full">
					<div className="flex flex-wrap items-center justify-between border-b border-gray-500 rounded-t-lg pl-4">
						{!isLoading ? (
							<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
								{part.name}
							</div>
						) : (
							<div className="skeleton mt-1 h-10 w-52 text-white text-5xl font-bold mb-2 align-middle"></div>
						)}
						<DropDownSettings />
					</div>
				</div>
				<div className="p-4 flex flex-col md:flex-none md:flex-row justify-between w-full">
					<div>
						<PartBadges part={part} />
						<Thumbnail
							id={parseInt(param.partID!)}
							size="w-28"
						/>
					</div>

					<div className="stats stats-vertical shadow basis-5/12 overflow-clip">
						<StatView title="Available stock">
							{!isLoading ? (
								part.unallocated_stock
							) : (
								<p className="skeleton h-10 w-full"></p>
							)}
						</StatView>
						<StatView title="Total stock">
							{!isLoading ? (
								part.total_in_stock
							) : (
								<p className="skeleton h-10 w-full"></p>
							)}
						</StatView>
						<StatView title="Allocated stock">
							{!isLoading ? (
								<Progressbar
									value={part.allocated_to_build_orders}
									max={part.required_for_build_orders}
								/>
							) : (
								<div className="skeleton h-10 w-full rounded-full position-relative"></div>
							)}
						</StatView>
					</div>
				</div>
			</div>
		</>
	);
};

/* <div className="col-sm-6">
      <div className="card text-white bg-dark mb-3">
        <div className="card-header container">
          <div className="row justify-content-between">
            <div className="col">R_10R_0402_1%</div>
            <div className="col">
              <div className="row text-end">
                <div className="col">
                  <button type="button" className="btn btn-primary btn-sm" onclick="location.href= window.location.origin + '/part/newedit/?pk=1'">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="card-body container">
            <div className="row">
              <div className="col-sm-6">
                <div className="card text-bg-dark">
                  <img src="data:image/png;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAGHAf0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopMim70bo9AD6KYro/SnZFRzgLRRRVgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFM3JQA7IqB7iGGNpJHVURd7s1YPjHxz4c8B6PLrfiPUUtrdE+Vc5eX2RK+EPjn+1f4j8bNd6TpVxJpehSfIlvF8jzJ/tvUTnygfQ3xa/a88K+E3m0bwXJb6rqaN5b3DSf6NC/8A7PXyxf8A7avx61LUZYLHX/J+f5Ps9tDs2f8AA0rx2zsNS8ST7/M+zJv3omyuq1V/BXwl8Of8JH4j3/8APCG3+/NeT/3Erm5yz2fTP21PiV8NtGbxP8S9XsNV01E8tLVrZEnmm/gjh2ffevQfhb/wUu+A/jkw2PjR73wTqEoP/H/++s/+/wAn/s6V+WXj/wCIviD4ka4+uayiW0SJss7GH7lmn+x/t/7dcu/mO6f7FXAD+iHw54q8N+K9NTV/C/iCw1axkTelxZXCTIf++K2QwPSv56/BnxF8f/DS/TVfh54t1XQbjfv32Ny6I/8AwD7lfYHwn/4KofFTw75Nj8VPDOm+LLT7j3dp/oF0n/sj/wDfCVtzkH6q0V88fCn9t39nv4rLFFYeObfRdSm/5husn7JMv/Az8j/99179DcwXcKzQyJLFIPldDuVqALNFMoqwH0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUVGZIxhGflqAF3+1ecfF340eEfhLpH2rWbqObUJ0zbWKN883/2FcX8ef2ltA+GHm+HdHmS98QOnRPnS0/3/wDbr8+vHnxL1jxP4huLrxBO9/qd0/8Ax8P86P8A/EVjzlHa/Fn4ueI/iJ4il1TWJHe6m3xw2iv8lsn9xK5jSvBj3l15+pfvok+/SeEtBe8v3vruC5eV/nrlfi18e7Xwlb3HgrwHOlzqf3LnU/vpZ/7Cf33/ANv/ANDrH+IWdF4z+JHhL4UW7/a/J1LW03+TpNu//j83/PFK+YvFvjbxB4/1l/Efie+ea7/5Y26f6mzT+5Cn/s9c47vc3Et3PI81xO++aaZ97zP/ALb0b9n/AH3sohAkseWfWm16L8K/2e/jL8aZfL+HPgDUtVt9/kvqH+psoX/j3zP8m/8A2N++vo3TP+CV3xruLOGbWfH3grTLidwiQNdzu2/+5nyeXrbkA+MrabZQ6fO9fUXxR/4JzftC/DHSLjXLSx03xhZWv7yZ9Eld7lE/64uiO/8AwDfXzAjoj+XTAZ+8T/lpXqfwr/al+O/wceKPwP4/v0sk+5p12/2my2f7j/c/4BXl9Qv8lUB+jnwm/wCCrtrM9vpvxl8BSWfZ9T0R96f8Dtn5/wC+HNfZ3wu/aD+EHxftIp/AXjzTNRlf/l0aTyblf+2L/PX4J+YPSpbO8u7CVLuxu5ra4T7k0T7H/wC+6OcR/RlkUtfi98Kf+Cg37RHww8mxn8Rp4q0qP/l31tfOf/v99/8A8fr7N+E3/BT74OeL/KsfiPpt54NvZAg81/8ASbXf/vp8/wD45Rzkn2pRXOeE/HPg3x3pq6v4M8VaZrdi/SaxuVmX8Sn3a6DclAD6KZRVgPooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiis7V9a0vQdNuNV1m9hs7S1XfNNKcIlAFx5oYleR5FVV+8x7V8mfH79rjT9GFx4R+H94JJcPHeanE/yJ/sQ/wDxdeZ/tH/tZX3iwzeHvB2oT6b4fh3pMyf66/8A9/8AuJ/sV8tp/avjbUfIk3w2X3E2I9YzmXCB1vifxI/iGVH0OP7S87/vpZX3/wDA6sab4SsdNtX1HxBPDDEib5pbj5ERKr6rf+B/hLpcV94jn2Xc8P7m0i+e6uX/ANz+Cvnf4kfFrxP8Qrp4L50s9KT/AFOnQ/cT/f8A77/7dY8hR3HxL+Pb6r5vh/4c77DTEfZNqL/665/2E/uJ/wCP14U8P+/Tv3b/AP2FHz+9bEj7a2nuZUgggeaV/kRE+d6/QX9kv/gnVZXmn2vxT/aPtRbWccaXVn4Zmfytiff33r/JsTZ/yw/4G/8Acrb/AOCcf7I2kDSdP/aI+JOnQXN7dDzfDNhMu9LONH4vf9/+5/c+/wDxps80/bn/AG2r34kape/Cj4X6rNbeD7GaeDUtRt3/AOQxMn+5/wAuyP8A990wPRv2k/8Agobo/gCyb4Vfsv6dpsMWnD7J/baWyPZW2z+Czh2bH2f33+T/AGHr8/vFvjbxp8QtdbxH4x8R6rreqzvve4vrl5n/AOAb/uf7n3KxYbae5lhgtIHmd3SCFIk373/uIlfpL+xd+wj/AMIl9i+M/wC0FYwwXduv23StBu3REtv7lzef7afJsT+D77/P8iUB9I/shWvjjwr+zL4VPxd1aX+0ILWa+eXUJCHtrJ3d4Umd/wC5Dj7/ANxNn9yvx++LviHQ/E/xS8YeJ/DFp9m0fV9evb2wTZs/cPO7p8n8HyfwV9c/t1ftxQfEGG9+Dvwfvn/4RrzPJ1jW4fk/tX+/aw/x+TvT53/j/wBz7/yZ4A+C3xY+K90lp8PPAGsa98+zzbS2/cp/vzfcT/gb0AcVvj/v0779fYvhX/gmj4/h05fEXxs+Jvhb4daVH87/AGi7S5mT/f8AnSD/AMfr6z+HP/BPH9mTwBYJrGv6VeeKpUTznufENzshCf8AXFNif990AfkD996Wvqr9tT4sfs5eJdUTwH8C/hR4SsV0u5/03xJpFgln9pkTenkweTsSZP8Aps/3/wCCvlpPnfy6AGeWfWpk+RaYn+fkoR/v/wCx/fqOQDd8H+NvGPgTUU1jwd4m1XRL1H3pLY3Lwv8A+OV9YfCL/gqD8ZfB6W+m/E3StN8YWUfyPcbPsd7/AN9p8j/98V8a79//ACzpiJu/5aUwP2g+FH7ef7PXxU+z2o8Vnw3qc4wLHWV8n/yN/q//AB+voSyvrW/tku7S4juIJPuSxPvVq/nef52r0f4Y/tFfGn4PlP8AhAPH+q2Fujo/2R5vOtf+/L/J/wCOVXOB+8nmL60u4V+b/wAI/wDgq3IVTSvjZ4E3b/k/tTQ//Q3tnf8A9AevtP4W/tEfB74vxJ/wgnjrTb66f/lyd/Juk/7Yv89HOKx6jRUO5KfVkj6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAQ9K+Q/2lfFWo+P/GCfDfQryVNP0h4/tnl9Jrr7+x/9z/0OvrS9uI7W2lupH2JCjOzemK/MLxh4w1WHxRqfiOPUZobvUbmeeaZP9v56yrfCXDcxPE/wf8QW1+k92jzWm/Y7wp9z/fryL4hfHix8Ezv4V+GsFtc3cDuk2pv86Qv/AHIU/j/369L+Mf7QmsW3wsu9OvvJm1PUZksku0TyXhT+/wDJXyVs8K6lav8A6W9tcJ/B/BWEIFzM+/16+1XUZdR1G+mubud973E3zu/+f+AVR3PWtN4Yfyku7ST7Sn9+H56qPbPD+7kj2VuYjU+5UuzZTKfv30Fn7F/snftEfB/4vfBXQfh9aeK7LR/EGm6HDol5pM9ylvdJ5MKw74f76Ps3jZ/fr5fuv+CUfxaTxPOlp8SvCT+Hy++O7uEuUvdm/wDjh2bP/H6+Edm9f9Y/yfIlaf8AbesPZfYX1i/+z7NnlfaX2UAfpV4L8I/sV/sMg6/4k8d2HjDx5afcdVS7vYn/ALlrao+y1/33/wC+/wCCuMs/jZrv7efj648Aa78Q9N+Fnw3RE36T/aUKanrf+xvf7/8AwD5P9h/v1+fWyN3/AHcfz7NlNRJ4f+Wif7+yqA/Y60/Y7+DnwS8MNq3w5+Atn8RfE1on+jw69qib5/k6h5k+zRt/uIlfKPxj/a+/bYfxDD8MNH+Hc/wyub1/sWm6Zp2kPNe3L/3IZpkeOT/fh2V5T+zV8eP2uLDxPpvgb4MeJ9X16W5b9zol8/2yySP/AG9/+pT/AG0dK/VzxJ8TtG+EXw1tvGvx+8S6Dpk9lCn2+axWbyGnx9y2jffM7+336APnX9nv9l5Phfa/8NDftc+M213xdp0X29JtZv8A7Ta6Cn9/zH+/N/tp8ifwV8v/ALZH7d2s/HH7X8Pfht9s0rwKnyXL/cudY/3/AO4n+x/33/BXuX7cHxS/Zn+MXwhtdatv2grmeaNHl0vQdAminF5P/fvLOTY6dPvzOmzZ8m568N/Yr/YguvjpcRfEP4j+fYeBLSbZDEjbJtYnT76J/ch/vv8A76J/G6AHlX7PH7JPxX/aMvFk8M6amm+H43/fa9epstk/2E/57v8A7n/A9lfY2u/Bb9hP9jbRoLr4tP8A8J14oaLzodPvgbm5m/3LJH8hE/67f991tftY/tpeD/2dNJT4JfAOzsE8SadbJA728SfYtBjzwiJ9x5v9j7n9/f8Acr8yte17WPFWs33iPxHqtzqWp6i/n3N3dzO7zP8A3970Afbuif8ABQL9neTXrfSr/wDZC8Mab4XTZB50MNnNdQp/17fZkT/gG+vZP2rf2I/gn4h+FGvfEz4VeHLHwtrWj6VPrUL6YPJsryBE854Xh+4m9B99NnX56+T/ANiT9jrVfj34ig8b+K9Pls/AGl3CfaJnG3+1J0f57aH/AGP7719Sf8FEv2m9F8G+B7v4EeDryJvEviG3EGsC36WGn5/1P+/J9zZ/c3/7FAH5e0/fs/5Z19Zfszf8E9/Fvxv0G0+Ifi7xjYeG/Cl789t9k2Xl1eQf3/v7Ifufx7/9yu88R/Cn/gmP8ONQPhbXvin4j13UYX2XE1leSXOz6vaw+TQB8HI+9PMod/8AnnX6Nx/8E+v2cPjZ4N/4S79nH4taki/OifaJkvLVJv7jpsSaF/8Af/74r4W+Lfwj8Y/BPxxf+AfG9nDFf2eyRJom3Q3kL/cmhc9Ef0/2KAOQRKls7+fTZ0u9Oupra7j+5LE+zZ/wP79VHmdKP3m//gG+pA+nvhL/AMFCP2hfhjcRWOq+IIfFujwfJ9n1lN77P9iZPn/9Dr7X+Ev/AAUk+B3xAeHTfF09z4I1V/kK6gN9nv8A+uyf+z7K/K3wT4D8T/EK9S18M2KOv/La7uH2WsP++/8A8RXueifDHwB8MVSfVXTXtVT/AJbSpvtYf9hE/gqucD9kNM1TT9YsotS0u9t7u1nTfDNA+9HX13Dirm4V+Tfhj42fEbw9LLfeCtfm0qKD53hif9y//APuP/uV9VfA/wDbG1PUryLwz8VrWGF3fZDqdumz/v8AJ/8AEUc4rH19RVeG5huYkuIJFeKRd6Mp+9VirJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDnfH1zJZ+DNZuk/5Z2E//AKAa/L7xV5kP+3/H/wCOV+nfxGwfA+tx/wB6ymr8wfFqOips/jqCkeBfHh/O8IWn/X+n/oD14V9yvcvje6f8Ilbx/wDUST/0B68KegmZds9VvtN+SC6dE/ub62E8WwXKPHqMH/A0Sua+/Rs96CDrUTTr/ZJaT/8AAKr3lhPC/wC7R9lc1C7wv5kb7K07PxDfWz/v/wB8n9yjkL5y79ymPc+TV6z1LRr/AP4+96PUqaVBcp59pdo8X+3QBUR/mT93veh/Mp72b2z+ZJTHf/npUlnsH7PX7UfxC/Zv1K7vPBlpol5b6i6fb7fULBHeZP8ArsmyZP8Ac37Kxvj5+0R8TP2hPF//AAlPjrVUjhg+Sw0y3+S2sE/uIn8f++/z/wDsnmfmf7VFUB1Xwd8FWvxH+LPhDwJqF0bS18Q6xa6fNcJ/Ak0yI/8Avvsr9hv2svGGpfs/fssa3dfCXSfsD6XZ2ukab9kT5NKgd0h85P8AcT7n+3sr8VLC5u9NvLe+sZ3tri1mSeGWJ9jwunzo6f3Hr7c+G3/BUTx9oehxeHPij8PdL8Z26RC3e7S7+xzTQ/cfzk2Ojv8A8ASgD4uSHUtYvUjjS5vLu9m/23mmnf8A9Devtr9lX/gnH4j8VGDxx+0HY3miaBG6Tw6JM3lXt/8A9dv+faH/AGPv/wC5Vq2/4KN/CbwZJLqXwu/ZI8MaJq8wP+lpNbWxz/2wtt7/APfaV5p4q/aF/a7/AGzdWuPAHhW0uJdPnRPtOieG4fs1t5P/AE8zO/3P+uz7P9igD6P/AGoP28/CHwo0Q/CH9m8WFxqFjH9ibULGNH0/So/7kP8AA7/7f3E/26/NfVdS1LWNRuNY1W+uby9vZnnubi4d3eZ3++719t+Dv+CVvjOTTv7b+LnxR0HwnZQJ50yWkP2x0T/ps7+Sif7/AM9XJPgh/wAE2Php+48Z/H3VfFV2kmyRLK6+0wu/9z/Qof8A2egD4l0fxh4t0GwvdG0bxPrGm2Wop/plvb3jww3P+/8AwP8A8Do8JeBvF3j/AFSLQ/BXhjVdevf4LexheZ0/232fc/33r7Wj+On/AATZ8BMqeD/2fNV8S3MPzpLf2/nwM/8At/arl/8A0Co9V/4Kf6jodk2k/B74E+GPCtp/q0S7k85P9/yYUhRP9zfQB9BfsLfs7eI/2X/A/ijxb8WtettKvNd8ie5tXvE+zadawI+x5X+5v/ePXw/+3P8AHjQPjv8AHGfUfCjpNofh2zj0Wzu9u37Zsd3eb/c3zfJ/uVxfxd/ac+Nnxvl8j4h+O7y50zfvTTLdEtrJP+2Kff8A+B7/APfrzWzsL7Vb+LStOtXubuf5EhiTe9AFT9w+/wAyRPkTfXtHwx+Ak+sRJ4j+IUc1npWzfDp/3Jrn/bf+4ldX8K/gPY+G5YvE/jWNLzU0/fw2n/LGzf8Av/7b13Gt6xJfzvpsF1NNvf8A1qJvrGcwM/WPEljolgmjeGdNdIoPueTDsSGuf03w3qt/K99d/cn+fynruPD3hKeFNl9Olzdv8/369S8B/C7WfEl+n+gvshTe71JtyHk/hLwlfarqiaHptrsd/v8A7nfXvGm/BbTbCLzNYtPJuEttm9Pvv/v16t4e8Jab4V0hLTSkhS7+T/S9nz/8Ap2q3MEPmvJJvR0++/33pQInA9A/Z/1ie58F/wBh3cju+iTfZUd/44P4K9UHQ14h8ALp49Y1uxk/5aQwTf7n369wPSuqOxiLRRRVAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAZmu2I1XR7zTT/y8wulflv8AELTZ7DW73Q7uB0eyvHh/3031+rFfEX7Y3wN1+21l/iT4UsZry3mT/T7eH7/+/QWfn58fofJ8NWnlx7P+Jr8n/fl68K2b6+iPi1pV94w0S00rSrF/ttrc+dNDM/kvs2Onyb68Jv8AR9R0q6+w6lY3Ntcf88pk+egxmZtFS7N9M8s+tADfk9qZT6KAIXp/2m7hf9xI9DpTHoA1rPxh9m/cajY+cn+w9a8N/oepJ5ccjwy/7f3K43yd9M8s+tRyF852z6PPu3psdJPubPnqo6SI/wB//wAcrCttYvrD95BO/wDuVtQ+MLS5tXgvtNTf/BN8/wAlAD0ejzq07az03UkeTTrtP7+x3rPms54X8vy6Cwrt/hj8bvih8F9RfVPht401XRJZ/wDXQxPvhm/34X3o/wDwNK4L5/epkfb/AMs6kD9A/hV/wVY1YImlfHH4fQX9ufkl1TQX2Oyf7dtN8j/99p/uV6lL8M/+Cf8A+2JE83hO/wBK0jxPdcBNJZNK1Hf72bpsk/39j/79flVuShHkSVJ4533p9ze9UB9WftT/ALCmo/s4aP8A8Jnb/FDRNV8PvKIYbe+/0PUnf+4kPzpP/wAA2f7lfKvnPuSOP771oa34z8XeMPsieJ/E2sax9i+S2S+v3ufJT/Y3v8ldd8KPhLqPxCuPtc6TW2hQPsubv+Ob/YT/AOLqJgY/gP4e+JviLqX2HSo/JtIH/wBJ1F/9TD/8W/8AsV9O+FfBngr4XaS/kSf8TDZsudRm/wBc/wD8QlXdSm0P4e6Nb6V4c01IbSBNkNun8H+//t1xtnoN94hun1XWZ5tn8Cb/AJKx5wOoTUtR8Q3/AJED7LR0/wBaldLpXh6xs7e38vzrln37ESrHhvQft91b6VpsD7Pk3uifIle9+CfhjaaUrvdwfI/zpvf7lZm0DkfAfwotIdmqzzzTed8+z+5XuGj2f9mq/wBkkdP9x6IbO0s4lggT5EqwnyJvrUQTJs++9c1rFzBs/eRo6J/BWxqV58j+XXGa9N5y+Qj7H/jelAg9A/Z/ufO8Vax8n/LnB/7PXv1eA/ssO9/aeINY2fuZLzyIX/2Er36ukyCiiirAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAZUFzbwXkTQXUKPFJ8jo1T0UAeI/E79kv4X/EWKWf+yksL1/n86H+/XyF8VP2FfH+gpcf2HBD4k0r/n3lTfs/4A//ALJX6V0UAfhJ42+Ak+jyy2l9pt/ol2n8Eyb4f/i//Q68y1v4deI9Hi897RLmL+/afvk/+Lr9/wDxZ8MvA/jO2e11/wAPWdzv/jZPnr5n+JX7Avh+9Z9S+HmsPptx9/ynoA/G10kT76f7FNr7Y+K/7JHjjw9LNJ4j8D/aUT5Pt1imyZ//AIv/AIHvr53174P30LP/AGNdpM/8Fvd/uZv++/uP/wCOUAeY1E/mPWrqWiaro8/2TVdNubaX+5Mmys90/wCmdBBSd5Epju9TOlM8mgCL/rpUvyUeT/t0/wAsetADN8kLpJBJs2VsW3i3WEiS0nRHiT5/ufPWVRQXznVWF/o+qy/PJ9metCbR4Eg+12k6TRfwbK4Xyx61Yh1LUrN/3E71HIHOdFNC8LeXJHVf53ptt4w3okGpQf8AA60rNLG8+eCf7/8ABQB1fwr+GN9481l433w6Vav/AKfN/G/+wlfRuveMNK8JaXF4Y8OJDbfZU/cwp/6BXTeHvhFfeAPAej+GLHyYfPhR7m43/Pvf79c5rHw6tIb/AO3faobmV3+//cesZzLMTw9YX2sJ9u1+N97v8kKV6x4P8Ex6xFFY6da+T/sJVvwN8N/EesXUUf2F3hdNnnSpsTZX0R4V8H6V4VtYoI40eVPn83+OsDaBn+DPh1aeGNLt7vzEe4n/APHK6tLnf+7omuZHlTy/uUx5k/vpWkICLf3KimvEhT5/uVRuZo4Ynd97v/Am+sK/mnm/eSfJF/c30cg+cfrGsb5fItXf/frznx/4qj0TyvD9rIj6rqn7iGFP4N/8dYnxI+LsHh69TQ/DkD3+t3XyJDCm/ZXpf7NP7Meuf2vF8Ufio/nam7+dbW7/AMFbQgYzmfRXwd8F2/gbwHpmjRx7H8lHm/367mmJ8iU+tiAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAZRRRQAUUUUAPooooAq3lpa3cXkXcCTI38Lpvrx74kfspfCr4ixSzXehpZ3c/35beva6KAPzs+J37A3jjR4pZPCM9trdl/wA+kyI/yf7j/J/45XyJ8Qv2e7rQZ5U1zw/qXh67/vonnWz/APAH/wDi6/c0qD1rn/E3gPwl4vtXtfEGgWd6j9pUoA/n6174XeI9Ki8+C0S/iT+Ox3v/AOOffrj5rae2/wBfA6bP79ftH8SP2BvBWvPLfeCr6bSrh/4N/wAlfJXxa/Y58f8AhXf/AGz4Vh1u3RP+P6H/AF3/AH2n3/8Agf8A3xQB8GUwfcevY/EPwWktp3g026+zS7/ktNRTY/8A32lef634M8QaIj/2rps1t/cm++j/AO46fI9AHL7np/3FTzKc9nPbffSm7JHoIHU16d5Z9aHSgCu6RvXQeBtNkvPGvh+0gf8A19/Aj/8Aof8A7JWKkPz13HwZh874p+GkRP8Al/3/APjj1BZ9cP8AEvVbCV7HWbp7n5/kd6l0Txtaf2onnok0W/565fxnbfOnmQfM9cP4e1L7NqTwTx797/7myuacC4H6V+BvFvh/UvDVpJpUCPbwQ/cd/vvV2zm3p+/k+evGvgneTp4X/eeS8X8GyvSJtY2Kn7umam09zsbZH89RXOpR23yRojy1nzalBDb/ALh0e4esq5v7HR7WXUdRu0hiT78zvVQINKa5T5555/8Afd68X8f/ABXvtVv/APhB/hzaTX+sO+x5k+4lZupeKvGPxy1z/hA/hlazJb79lzfIn3K+tPgD+zP4Y+D+nRajNbC816dN9zcP/fraECTmP2bP2YLHwZap408d2qX/AIjuvnTzv+WNfSyJGn3Kds96KsgfRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAMooooAKKKKAH0UUUAFFFFABRRRQAVXuLS2uU8ueBJV/utViigDyrx/+zf8LfiLFMdV0CGGeb/ltCmx6+WviV+wFrenRXF18P8AWEubd/ne0uP4/wDf/v8A/A6++qZs96APxX+Iv7M2s+GPNj8T+C7yw/6eLFPk/wC+Puf+gV4vrHwi1WFPM0qeG/2f8sk/czf98PX7/wCq+HtG16FoNY0u2vIn/glSvCPib+xX8LvHKvdaVY/2PfP+83w/c30Afh5f6VqOmyvBfWM0Lp99JU2OlVa/SX4o/sLfEbRYWktILPxJaJ/yylTfsr5S8Z/AdNNupY7rStS0S4/uTI80P/xf/j70AeCbPeu7+Bv/ACVrw1/1+f8Asj1U1j4XeKtH3zx2qXiJ/HaP53/jn36Php5ln8RPDkkj7P8AiZQJQQfVvjOaC5l/dp8iV5E80f8AbaeZHseR9mz+/Xqfi1JLZ0T+D+OvMb+wurzXreS0+R/OSsjaB9l/BNPO8JJJ5j7Pnr0WZPueX/uVwvwlv/sHgq0sYI0+0OnzvVfxt8XdG8JWrp5/2zUH+RLdEpchfOdl4q8VeHPBOlvquszpCmz5E/jevL/DPhb4jftQeIja6dA9h4Zjf99L9xK6P4Rfs6+OPjrrKeMvibPNZ6Fv3w2z/wAdfcXhPwf4f8FaNFofhzTYbO0jT7iLVwIOf+FHwa8I/CTQYtH8P2KLLs2TXDffmrvqKKsgfRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADKKKKACiiigB9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAMdN1cr4v+GXgvxtay2viHQLS58z+PZ89dbRQB8f/ABF/4J++GNSd77wHqr6bcfwRP9yvlT4i/sl/E3wZfpfar4OTVfsU3nQ31onz70/20+//AMDr9a6rS2kE8XkTJvT+61AH45alraOzx6rYzWd6n8EqPsrHs9NsftUV9PqsPyPvd0dP/Z6/Wfxh8AvhV45VzrnhKzMr/wDLZE2PXluo/sFfBy6uEnt0uYdj79u+oA+NbDxt4m1KK08K+BLGa8u3+T9yn3K+n/2eP2PVsLqLx38VJXvNTd98No/3Er3z4bfAr4dfCi3ePwvocKSv1mdN716EibassitrOCzgSC0gSGKP7iJUtPooICiiigB9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAMooooAKKKKAH0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAnHtTaKKACiiigAooooAfRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADKKKKACiiigB9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAMooooAKKKKACiiigB9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//2Q==" className="card-img" id="thumbnail">
                  <div className="card-img-overlay">
                    <button type="button" className="btn btn-link position-absolute start-0 top-0" onclick="createModal('imageModal')">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </div>
                </div>
                <h4 className="card-title">Description</h4>
                <p className="card-text">10R resistor in 0402 SMD package</p>
              </div>
              <div className="col-sm-6">
                <div>
                  <h3>Available stock</h3>
                  <p>1880</p>
                </div>
                <div>
                  <h4>Total stock</h4>
                  <div className="row align-items-center">
                  <div className="col">
                    <p>3030</p>
                  </div>
                  <div className="col">
                    <p></p>
                  </div>
                </div>
                <div>
                  <h4>Allocated Stock</h4>
                  <div className="progress position-relative">
                    <div className="progress-bar" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                    <small className="justify-content-center d-flex position-absolute w-100">1150 / 2580</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */
